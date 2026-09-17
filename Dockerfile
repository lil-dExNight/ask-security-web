# Based on the official Next.js Docker example (output: "standalone").
# Note: no `# syntax=` directive — Railway's builder rejects custom frontends.

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image: standalone server only
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache su-exec \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Blog posts are read from content/blog; a Railway volume is mounted over /app/content.
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
COPY docker-entrypoint.sh ./

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./docker-entrypoint.sh"]
