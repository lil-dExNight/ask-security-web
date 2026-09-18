import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSessionToken,
  isAdminConfigured,
  login,
  verifySessionToken,
} from "./auth";

beforeEach(() => {
  vi.stubEnv("ADMIN_PASSWORD", "test-password");
  vi.stubEnv("SESSION_SECRET", "test-secret");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("configuration", () => {
  it("reports configured when ADMIN_PASSWORD is set", () => {
    expect(isAdminConfigured()).toBe(true);
  });

  it("reports unconfigured when ADMIN_PASSWORD is empty", () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    expect(isAdminConfigured()).toBe(false);
  });

  it("creates no token when neither secret is set", () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    vi.stubEnv("SESSION_SECRET", "");
    expect(createSessionToken()).toBeNull();
  });
});

describe("login", () => {
  it("accepts the correct password and rejects others", () => {
    expect(login("test-password")).toBe(true);
    expect(login("wrong")).toBe(false);
    expect(login(undefined)).toBe(false);
    expect(login(42)).toBe(false);
  });
});

describe("session tokens", () => {
  it("verifies a freshly created token with a ~7 day expiry", () => {
    const token = createSessionToken();
    expect(token).toBeTruthy();
    const payload = verifySessionToken(token);
    const now = Math.floor(Date.now() / 1000);
    expect(payload).not.toBeNull();
    expect(payload!.exp).toBeGreaterThan(now + 6 * 24 * 60 * 60);
    expect(payload!.exp).toBeLessThanOrEqual(now + 7 * 24 * 60 * 60);
  });

  it("produces base64url(payload).signature format", () => {
    const token = createSessionToken()!;
    expect(token).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
  });

  it("rejects a tampered signature", () => {
    const token = createSessionToken()!;
    const dot = token.lastIndexOf(".");
    const signature = token.slice(dot + 1);
    const flipped = signature.startsWith("a") ? `b${signature.slice(1)}` : `a${signature.slice(1)}`;
    expect(verifySessionToken(`${token.slice(0, dot)}.${flipped}`)).toBeNull();
  });

  it("rejects a tampered payload", () => {
    const token = createSessionToken()!;
    const dot = token.lastIndexOf(".");
    const forged = Buffer.from(JSON.stringify({ exp: 4_000_000_000 }), "utf8").toString(
      "base64url",
    );
    expect(verifySessionToken(`${forged}.${token.slice(dot + 1)}`)).toBeNull();
  });

  it("rejects an expired token", () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    const token = createSessionToken(eightDaysAgo)!;
    expect(verifySessionToken(token)).toBeNull();
  });

  it("rejects a token signed with a different secret", () => {
    const token = createSessionToken()!;
    vi.stubEnv("SESSION_SECRET", "other-secret");
    expect(verifySessionToken(token)).toBeNull();
  });

  it("falls back to ADMIN_PASSWORD when SESSION_SECRET is unset", () => {
    vi.stubEnv("SESSION_SECRET", "");
    const token = createSessionToken()!;
    expect(verifySessionToken(token)).not.toBeNull();
    vi.stubEnv("ADMIN_PASSWORD", "changed");
    expect(verifySessionToken(token)).toBeNull();
  });

  it("rejects malformed input", () => {
    expect(verifySessionToken(undefined)).toBeNull();
    expect(verifySessionToken("")).toBeNull();
    expect(verifySessionToken("no-dot")).toBeNull();
    expect(verifySessionToken(".signature")).toBeNull();
    expect(verifySessionToken("not-json.sig-but-invalid")).toBeNull();
  });
});
