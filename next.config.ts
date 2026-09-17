import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a static site (out/) for GitHub Pages.
// BASE_PATH is the URL prefix the site is served under (e.g. /ask-security-web).
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || "";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  poweredByHeader: false,
  // Exposed to client code so asset() can prefix public-asset URLs; next/image
  // does not apply basePath to src. Empty in normal (server) mode.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isStaticExport
    ? {
        // Static export has no image server; GitHub Pages ignores custom headers.
        images: { unoptimized: true },
        basePath,
        assetPrefix: basePath || undefined,
        // Directory-style URLs (blog/index.html) work on any static host.
        trailingSlash: true,
      }
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default nextConfig;
