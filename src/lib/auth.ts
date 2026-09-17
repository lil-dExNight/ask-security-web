import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ask_admin";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export interface SessionPayload {
  exp: number;
}

function getSecret(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  return password ? password : null;
}

export function isAdminConfigured(): boolean {
  return getSecret() !== null;
}

export function login(password: unknown): boolean {
  const secret = getSecret();
  if (!secret || typeof password !== "string") return false;
  const a = crypto.createHash("sha256").update(password).digest();
  const b = crypto.createHash("sha256").update(secret).digest();
  return crypto.timingSafeEqual(a, b);
}

function sign(value: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

export function createSessionToken(now: number = Date.now()): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const payload: SessionPayload = {
    exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded, secret)}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  const secret = getSecret();
  if (!secret || !token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;
    if (typeof data.exp !== "number" || data.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return { exp: data.exp };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export async function setSession(): Promise<boolean> {
  const token = createSessionToken();
  if (!token) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return true;
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
