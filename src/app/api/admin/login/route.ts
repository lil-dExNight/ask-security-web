import { NextRequest, NextResponse } from "next/server";
import { isAdminConfigured, login, setSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FAILURES = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000;
const GLOBAL_MAX_FAILURES = 20;
const MAX_ENTRIES = 1000;

interface AttemptState {
  failures: number;
  blockedUntil: number;
}

// In-memory rate limiting is per-instance: it resets on restart and is not
// shared across replicas. Fine for single-instance deploys.
const attempts = new Map<string, AttemptState>();

// Global lockout stops distributed guessing that rotates source IPs.
const global = { failures: [] as number[], blockedUntil: 0 };

function clientIp(request: NextRequest): string {
  // cf-connecting-ip is set by the Cloudflare edge and cannot be spoofed
  // through the proxy.
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  // The last x-forwarded-for value is the one the edge appended; earlier
  // values are client-controlled.
  const forwarded = request.headers.get("x-forwarded-for");
  const last = forwarded
    ?.split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .pop();
  return last || "unknown";
}

function isBlocked(ip: string): boolean {
  const state = attempts.get(ip);
  if (!state) return false;
  if (state.blockedUntil > Date.now()) return true;
  if (state.blockedUntil !== 0) attempts.delete(ip); // block window expired
  return false;
}

// Bound the map size: evict the oldest-expiring entries before inserting.
function evictIfFull(): void {
  if (attempts.size < MAX_ENTRIES) return;
  const excess = attempts.size - MAX_ENTRIES + 1;
  const oldest = [...attempts.entries()]
    .sort((a, b) => a[1].blockedUntil - b[1].blockedUntil)
    .slice(0, excess);
  for (const [key] of oldest) attempts.delete(key);
}

function recordFailure(ip: string): void {
  const state = attempts.get(ip) ?? { failures: 0, blockedUntil: 0 };
  state.failures += 1;
  if (state.failures >= MAX_FAILURES) {
    state.blockedUntil = Date.now() + BLOCK_DURATION_MS;
  }
  if (!attempts.has(ip)) evictIfFull();
  attempts.set(ip, state);

  const now = Date.now();
  global.failures = global.failures.filter((t) => now - t < BLOCK_DURATION_MS);
  global.failures.push(now);
  if (global.failures.length >= GLOBAL_MAX_FAILURES) {
    global.blockedUntil = now + BLOCK_DURATION_MS;
    global.failures = [];
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin password is not configured" },
      { status: 503 },
    );
  }
  const ip = clientIp(request);
  if (isBlocked(ip) || global.blockedUntil > Date.now()) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const password = (body as { password?: unknown } | null)?.password;
  if (!login(password)) {
    recordFailure(ip);
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  attempts.delete(ip);
  await setSession();
  return NextResponse.json({ ok: true });
}
