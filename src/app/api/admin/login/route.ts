import { NextRequest, NextResponse } from "next/server";
import { isAdminConfigured, login, setSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FAILURES = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000;

interface AttemptState {
  failures: number;
  blockedUntil: number;
}

// In-memory rate limiting is per-instance: it resets on restart and is not
// shared across replicas. Fine for single-instance deploys.
const attempts = new Map<string, AttemptState>();

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isBlocked(ip: string): boolean {
  const state = attempts.get(ip);
  if (!state) return false;
  if (state.blockedUntil > Date.now()) return true;
  if (state.blockedUntil !== 0) attempts.delete(ip); // block window expired
  return false;
}

function recordFailure(ip: string): void {
  const state = attempts.get(ip) ?? { failures: 0, blockedUntil: 0 };
  state.failures += 1;
  if (state.failures >= MAX_FAILURES) {
    state.blockedUntil = Date.now() + BLOCK_DURATION_MS;
  }
  attempts.set(ip, state);
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin password is not configured" },
      { status: 503 },
    );
  }
  const ip = clientIp(request);
  if (isBlocked(ip)) {
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
