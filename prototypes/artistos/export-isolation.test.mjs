// Run ONLY after a successful static export: node --test prototypes/artistos/export-isolation.test.mjs
// Generated-output guard, not proof that deployment is private.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const output = 'out';
const nameMarker = /artistos|fixturepreview|demo[-_ ]musician/i;
const textMarker = /ArtistOSFixturePreview|INTERNAL SYNTHETIC FIXTURE|NOT AN ARTIST PROFILE|Demo Musician/;
const textExt = /\.(?:html?|css|js|mjs|json|svg|txt|xml|webmanifest|map)$/i;

test('static export contains no synthetic ArtistOS fixture markers', () => {
  assert.ok(existsSync(output) && statSync(output).isDirectory(), 'Missing out/; run successful Next static build first');
  const files = [];
  const findings = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      const rel = relative(output, path);
      if (nameMarker.test(rel)) findings.push(rel + ' [path]');
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) {
        files.push(rel);
        if (textExt.test(entry.name)) {
          const data = readFileSync(path, 'utf8');
          if (textMarker.test(data)) findings.push(rel + ' [content]');
        }
      }
    }
  };
  walk(output);
  assert.ok(files.some((name) => /(?:^|\/)index\.html$/i.test(name)), 'No exported index.html found; refusing vacuous pass');
  assert.deepEqual(findings, [], 'Synthetic fixture present in exported output');
});
