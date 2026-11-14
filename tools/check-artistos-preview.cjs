// Run offline from repo root: node tools/check-artistos-preview.cjs
// No network calls, test database, paid CI, or external dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = process.argv[2] || process.cwd();
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const home = read('app/artistos-preview/page.tsx');
const homeCss = read('app/artistos-preview/page.module.css');
const booking = read('app/artistos-preview/booking-readiness/page.tsx');
const bookingClient = read('app/artistos-preview/booking-readiness/readiness-client.tsx');
const bookingCss = read('app/artistos-preview/booking-readiness/page.module.css');

function noPersonalDataControls(file, name) {
  assert.doesNotMatch(file, /<(form|input|video|iframe)\b/i, name + ': disallowed data/media element');
  assert.doesNotMatch(file, /fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB/i, name + ': disallowed network or storage');
  assert.doesNotMatch(file, /Atenda|Chinx|Gemma Griffiths/i, name + ': real prospective artist referenced');
}
function hasCssClasses(source, css, name) {
  const classes = [...new Set([...source.matchAll(/styles\.([A-Za-z]\w*)/g)].map(m => m[1]))];
  for (const nameOfClass of classes) {
    // A class may share a selector group, e.g. .item,.checked{...}.
    assert.match(css, new RegExp('\\.' + nameOfClass + '(?![\\w-])'), name + ': missing CSS selector ' + nameOfClass);
  }
}
function hasAnchors(source) {
  for (const [, id] of source.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(source.includes('id="' + id + '"'), 'missing anchor #' + id);
  }
}

assert.match(home, /FICTIONAL DEMO/, 'home: fictional warning required');
assert.match(booking, /FICTIONAL DEMO/, 'booking: fictional warning required');
assert.match(home, /robots:\s*\{\s*index:\s*false/, 'home: noindex required');
assert.match(booking, /robots:\s*\{\s*index:\s*false/, 'booking: noindex required');
for (const [file, name] of [[home, 'home'], [booking, 'booking'], [bookingClient, 'booking client']]) {
  noPersonalDataControls(file, name);
}
hasCssClasses(home, homeCss, 'home');
hasCssClasses(booking + bookingClient, bookingCss, 'booking');
hasAnchors(home);
assert.match(home, /artistos-preview\/booking-readiness\//, 'home does not link to checklist');
assert.match(booking, /nacz\.co\.zw\/registration-requirements/, 'missing official verification reference');
assert.match(booking, /site-level analytics/, 'inherited analytics caveat missing');
assert.match(bookingClient, /useState<string\[\]>\(\[\]\)/, 'review must be ephemeral state');
assert.match(bookingClient, /aria-pressed=\{active\}/, 'buttons must announce review status');
assert.match(bookingClient, /setReviewed\(\[\]\)/, 'clear/reset control missing');
const ids = [...bookingClient.matchAll(/\bid:\s*'([a-z]+)'/g)].map(m => m[1]);
assert.equal(ids.length, 8, 'expected eight booking readiness checks');
assert.equal(new Set(ids).size, ids.length, 'duplicate checklist identifiers');
assert.match(homeCss, /@media\(max-width:620px\)/, 'home mobile style missing');
assert.match(bookingCss, /@media\(max-width:650px\)/, 'booking mobile style missing');
console.log('ArtistOS source policy, booking checklist, CSS and anchor checks PASS');
