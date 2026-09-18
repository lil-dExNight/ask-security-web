import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";
import { createSessionToken } from "@/lib/auth";

const NONCE_RE = /nonce-([A-Za-z0-9_-]{22})/;

function request(path: string, init?: { method?: string; headers?: Record<string, string> }) {
  return new NextRequest(`http://localhost:3000${path}`, init);
}

beforeEach(() => {
  vi.stubEnv("SESSION_SECRET", "test-secret");
  vi.stubEnv("ADMIN_PASSWORD", "test-password");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Content-Security-Policy", () => {
  it("sets a nonce-based strict CSP on a non-admin response", async () => {
    const response = await middleware(request("/"));
    const csp = response.headers.get("content-security-policy");
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("'strict-dynamic'");
    expect(csp).toMatch(NONCE_RE);
  });

  it("forwards the same CSP on the request headers so Next applies the nonce", async () => {
    const response = await middleware(request("/blog"));
    const csp = response.headers.get("content-security-policy");
    const forwarded = response.headers.get("x-middleware-request-content-security-policy");
    expect(forwarded).toBe(csp);
  });

  it("generates a fresh nonce per request", async () => {
    const first = await middleware(request("/"));
    const second = await middleware(request("/"));
    const nonceOf = (res: Response) =>
      NONCE_RE.exec(res.headers.get("content-security-policy")!)![1];
    expect(nonceOf(first)).not.toBe(nonceOf(second));
  });
});

describe("admin session guard", () => {
  it("redirects GET /admin without a session cookie to /admin/login", async () => {
    const response = await middleware(request("/admin"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/admin/login");
  });

  it("lets GET /admin through with a valid session cookie", async () => {
    const token = createSessionToken()!;
    const response = await middleware(
      request("/admin", { headers: { cookie: `ask_admin=${token}` } }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-security-policy")).toMatch(NONCE_RE);
  });

  it("rejects GET /admin with a tampered session cookie", async () => {
    const response = await middleware(
      request("/admin", { headers: { cookie: "ask_admin=forged.signature" } }),
    );
    expect(response.status).toBe(307);
  });

  it("returns 401 for unauthenticated /api/admin/* requests", async () => {
    const response = await middleware(request("/api/admin/posts"));
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "Unauthorized" });
  });

  it("lets /admin/login through without a session", async () => {
    const response = await middleware(request("/admin/login"));
    expect(response.status).toBe(200);
    expect(response.headers.get("content-security-policy")).toMatch(NONCE_RE);
  });
});

describe("CSRF hardening", () => {
  it("rejects cross-site mutations to /api/admin/* with 403", async () => {
    const response = await middleware(
      request("/api/admin/posts", {
        method: "POST",
        headers: { "sec-fetch-site": "cross-site" },
      }),
    );
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "Forbidden" });
  });

  it("allows cross-site GET requests to /api/admin/* to reach the session check", async () => {
    const response = await middleware(
      request("/api/admin/posts", { headers: { "sec-fetch-site": "cross-site" } }),
    );
    expect(response.status).toBe(401);
  });

  it("rejects cross-site login attempts with 403", async () => {
    const response = await middleware(
      request("/api/admin/login", {
        method: "POST",
        headers: { "sec-fetch-site": "cross-site" },
      }),
    );
    expect(response.status).toBe(403);
  });
});
