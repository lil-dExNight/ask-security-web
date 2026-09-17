#!/bin/sh
set -e

# A Railway volume mounted at /app/content is root-owned; hand it to the app
# user so the admin panel can write posts, then drop privileges.
chown -R nextjs:nodejs /app/content

exec su-exec nextjs node server.js
