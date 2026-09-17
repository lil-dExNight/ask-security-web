# Deployment

The site is deployed to GitHub Pages as a static export. The workflow in
`.github/workflows/deploy.yml` moves the server-only code (admin panel, API
routes, middleware) aside, builds with `STATIC_EXPORT=1` and
`BASE_PATH=/ask-security-web`, and publishes the `out/` directory.

## One-time setup

1. In the GitHub repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

## Deploy

Push to `master` (or run the workflow manually via **Actions → Deploy to
GitHub Pages → Run workflow**). The site is published at:

https://lil-dexnight.github.io/ask-security-web/

## Publishing posts

The admin panel and API run only locally; they are excluded from the static
build.

1. `npm run dev`
2. Set `ADMIN_PASSWORD` in `.env.local`.
3. Edit posts at `http://localhost:3000/admin`.
4. Commit the changed files in `content/blog/` and push — CI rebuilds and
   deploys the static site.

## Custom domain (later)

1. Add the domain under **Settings → Pages → Custom domain**.
2. Add a `public/CNAME` file with the domain name.
3. In `.github/workflows/deploy.yml`, set `BASE_PATH` to an empty string
   (and `SITE_URL` in `src/lib/site.ts` to the real domain).

## Limitations

- GitHub Pages serves no custom security headers. `public/_headers` is a
  Cloudflare-only feature and is kept for a possible future move; it is
  deployed as a plain file and ignored by Pages.
- The admin panel, API routes and middleware exist only locally
  (`npm run dev`). They are not part of the deployed site.
