// The `server-only` package is resolved by Next.js via a bundler alias to
// next/dist/compiled/server-only, so it is not a node_modules dependency.
// This declaration keeps tsc happy; the guard still fires at build time.
declare module "server-only";
