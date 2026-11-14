// Run offline: node tools/check-artistos-preview.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = process.argv[2] || process.cwd();
const page = fs.readFileSync(path.join(root, 'app/artistos-preview/page.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app/artistos-preview/page.module.css'), 'utf8');

assert.match(page, /FICTIONAL DEMO/, 'missing fictional notice');
assert.match(page, /robots:\s*\{\s*index:\s*false/, 'preview should be noindex');
assert.doesNotMatch(page, /<(form|input|video|iframe)\b/i, 'must not collect data or autoplay media');
assert.doesNotMatch(page, /fetch\s*\(|localStorage|sessionStorage/, 'no client storage or data calls allowed');
assert.doesNotMatch(page, /Atenda|Chinx|Gemma Griffiths/i, 'no artist association without consent');
const classes = [...page.matchAll(/styles\.([A-Za-z]\w*)/g)].map(m => m[1]);
for (const c of classes) assert.ok(css.includes('.' + c), 'missing CSS class ' + c);
const targets = [...page.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
for (const id of targets) assert.ok(page.includes('id="' + id + '"'), 'missing anchor ' + id);
assert.match(css, /@media\(max-width:620px\)/, 'mobile styles missing');
console.log('ArtistOS static privacy, style and anchor checks PASS');
