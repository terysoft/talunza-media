// Run from repository root: node --test prototypes/artistos/fixture-safety.test.mjs
// Source-level safety checks only; not a substitute for typecheck, build or security review.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const previewPath = 'prototypes/artistos/ArtistOSFixturePreview.tsx';
const preview = readFileSync(previewPath, 'utf8');
const appDir = 'app';

test('fixture is labelled as synthetic and unverified', () => {
  assert.match(preview, /INTERNAL SYNTHETIC FIXTURE/);
  assert.match(preview, /NOT AN ARTIST PROFILE/);
  assert.match(preview, /Rights unverified/);
});
test('fixture contains no network, storage, or data collection calls', () => {
  assert.doesNotMatch(preview, /\b(fetch|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage)\b\s*(?:\(|\[|\.)/);
  assert.doesNotMatch(preview, /<form\b|<input\b|<textarea\b/i);
  assert.doesNotMatch(preview, /https?:\/\//i);
});
test('fixture does not name or impersonate a prospective artist', () => {
  assert.doesNotMatch(preview, /Atenda|Chinx/i);
  assert.match(preview, /Demo Musician/);
});
test('fixture is not imported by public app route files', () => {
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        const src = readFileSync(path, 'utf8');
        assert.doesNotMatch(src, /ArtistOSFixturePreview|prototypes\/artistos/, path);
      }
    }
  }
  walk(appDir);
});
