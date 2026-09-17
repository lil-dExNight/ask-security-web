# Deployment

The site runs as a native Node.js server on [Railway](https://railway.app),
built from the `Dockerfile` in this repo. Blog and admin panel work in
production: posts are markdown files on a persistent volume.

## One-time setup

1. Create a Railway account at https://railway.app (sign in with GitHub).
2. **New Project → Deploy from GitHub repo** → pick `ask-security-web`.
   Railway auto-detects the `Dockerfile` and builds it.
3. Add a volume so posts survive redeploys: in the service, go to
   **Volumes → Add Volume**, mount path `/app/content`.
4. Add an environment variable: **Variables → New Variable**,
   `ADMIN_PASSWORD=<strong password>`. Without it, `/admin` login stays
   disabled.
5. **Settings → Networking → Generate Domain** to get a temporary
   `*.up.railway.app` domain and test the deployment.
6. Add the custom domain: **Settings → Networking → Custom Domain** →
   `asksecurity.xyz` (also add `www.asksecurity.xyz`). Railway shows the
   CNAME target to point at.
7. DNS (domain is on Cloudflare DNS, free plan):
   - Add `asksecurity.xyz` to Cloudflare and set the Cloudflare nameservers
     at the registrar.
   - Create a CNAME record: `asksecurity.xyz` → the Railway target from
     step 6. Cloudflare flattens the apex CNAME automatically.
   - Create a CNAME record: `www` → the same Railway target.
8. Verify: `https://asksecurity.xyz` loads, `https://asksecurity.xyz/admin`
   accepts the password, and a post published in the admin panel shows up at
   `/blog`.

## Deploys

Every push to `master` triggers a new build and deploy automatically. No
GitHub Actions deploy step is involved; `.github/workflows/ci.yml` only runs
lint + build as the CI gate.

## Notes

- Cost: about $5/month with usage-based pricing (Hobby plan).
- Posts live on the volume (`/app/content/blog`), not in git. Periodically
  commit `content/blog/` to the repo as a backup. A fresh volume starts
  empty — the blog shows the empty state until the first post is published.
- The admin panel runs natively in production at `/admin`; `middleware.ts`
  guards it with the `ADMIN_PASSWORD` session cookie.

## Local development

```bash
npm run dev
```

Set the admin password in `.env.local`:

```bash
# .env.local
ADMIN_PASSWORD=your-strong-password
```

Then open http://localhost:3000/admin.

## Docker (manual)

```bash
docker build -t ask-security-web .
docker run -e ADMIN_PASSWORD=your-strong-password -p 3000:3000 ask-security-web
```
