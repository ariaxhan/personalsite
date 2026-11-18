#!/bin/bash
# Republishes ariaxhan.com when the GitHub commit count or the site source changes.
# Works from a clean export of origin/main, so the shared checkout is never touched.
set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(dirname "$SITE_DIR")"
STATE_DIR="$HOME/.local/state/personalsite"
STATE_FILE="$STATE_DIR/proof-count"
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

git -C "$REPO_DIR" fetch --quiet origin main
git -C "$REPO_DIR" archive origin/main app/utils scripts site-v2 | tar -x -C "$WORK_DIR"

(cd "$WORK_DIR" && node scripts/proof-of-motion.mjs >/dev/null)
current="$(node -p "const d=require('$WORK_DIR/app/utils/motionData.json'); d.grandTotal+' '+d.repoCount")"
# The site tree is part of the key, so a project list change republishes too.
current="$current $(git -C "$REPO_DIR" rev-parse origin/main:site-v2)"
total="${current%% *}"
previous="$(cat "$STATE_FILE" 2>/dev/null || true)"

if [ "$current" = "$previous" ]; then
  echo "unchanged: $current"
  exit 0
fi

# A partial GitHub response must never publish a collapsed number.
previous_total="${previous%% *}"
if [ "$total" -le 0 ] || { [ -n "$previous_total" ] && [ "$total" -lt $((previous_total * 9 / 10)) ]; }; then
  echo "refusing suspicious commit count: $previous -> $current" >&2
  exit 1
fi

ln -s "$SITE_DIR/node_modules" "$WORK_DIR/site-v2/node_modules"
cd "$WORK_DIR/site-v2"
npm run build >/dev/null
export CLOUDFLARE_ACCOUNT_ID=efe6d9809df58b0c911aa80e484564af
CLOUDFLARE_API_TOKEN="$(security find-generic-password -s cloudflare-api-token -w)"
export CLOUDFLARE_API_TOKEN
npx --yes wrangler pages deploy dist --project-name ariaxhan-site-v2 --branch main --commit-dirty=true >/dev/null

mkdir -p "$STATE_DIR"
printf '%s\n' "$current" > "$STATE_FILE"
echo "published: ${previous:-none} -> $current"
