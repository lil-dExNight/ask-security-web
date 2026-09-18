# ASK Security — Website

Website for ASK Security, a web3 security audit company. Landing page, markdown blog with an admin panel, deployed on Railway.

## Stack

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- Motion (`motion/react`) + Lenis for animations and smooth scrolling
- gray-matter + react-markdown for the blog
- Vitest for unit tests

## Quick start

```bash
npm install
npm run dev         # dev server on http://localhost:3000
npm run build       # production build
npm start           # serve the production build
npm run lint        # eslint
npm test            # unit tests (vitest run)
npm run test:watch  # watch mode
```

## Project structure

- `src/app/(marketing)/` — landing page. Sections: Hero, Services, StatsBand, Cases, Contact. Editorial dark design, matrix-green palette, disciplined acid accent.
- `src/components/landing/` — landing section components.
- `src/app/blog/` — public blog: `/blog`, `/blog/[slug]`, RSS at `/blog/rss.xml`. Dynamically rendered (`force-dynamic`).
- `src/app/admin/` — admin panel for managing posts.
- `src/app/api/admin/` — admin REST API (login, logout, post CRUD).
- `content/blog/` — blog posts as markdown files (currently empty, `.gitkeep` only).
- `src/middleware.ts` — per-request CSP nonce and admin route guarding.
- `src/lib/` — blog and auth helpers.

## Blog

Posts are markdown files in `content/blog/` with frontmatter: `title`, `date`, `excerpt`, `tags`, `draft`. They are read from disk at request time. Drafts are hidden from the public blog. RSS feed at `/blog/rss.xml`.

## Admin panel

`/admin` provides post CRUD with a live markdown preview, backed by `/api/admin/posts`. Auth is a signed httpOnly cookie (HMAC-SHA256, built on `node:crypto`), with rate limiting on login.

Required environment variables (`.env.local`):

```bash
ADMIN_PASSWORD=your-strong-password   # required; without it login stays disabled
SESSION_SECRET=random-string          # optional; signs sessions instead of the password
```

## Security headers

Most headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`. The Content-Security-Policy is set per request in `src/middleware.ts` with a nonce (`script-src 'self' 'nonce-...' 'strict-dynamic'`). Because of the nonce, pages render dynamically.

## CI

`.github/workflows/ci.yml` runs `npm ci`, `npm audit`, lint, tests and build on every push and pull request to `master`.

## Deployment

Railway, Docker multistage build (node:22-alpine pinned by sha256), `output: "standalone"`. Blog posts live on a volume mounted at `/app/content`. Domain `asksecurity.xyz` via Cloudflare. See [DEPLOY.md](DEPLOY.md).
