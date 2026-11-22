#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo '=== TALUNZA MEDIA TYPECHECK ==='
npm run typecheck
echo '=== TALUNZA MEDIA ENQUIRY + SEO CONTRACTS ==='
node --test tests/media-enquiry.test.mjs tests/media-seo.test.mjs
echo '=== TALUNZA MEDIA STATIC EXPORT ==='
npm run build
echo 'TALUNZA_MEDIA_ASSET=CHECKED'
