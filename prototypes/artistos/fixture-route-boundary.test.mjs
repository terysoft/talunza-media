// Run from repo root: node --test prototypes/artistos/fixture-route-boundary.test.mjs
// Conservative source guard; NOT proof of runtime isolation or privacy.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const roots = ['app', 'src/app', 'pages', 'src/pages', 'components', 'src/components', 'lib', 'src/lib'];
const skip = new Set(['node_modules', '.next', 'out', '.git', 'prototypes']);
const extensions = /\.(?:js|jsx|ts|tsx|mjs|cjs)$/;
const fixtureReference = /ArtistOSFixturePreview|(?:^|[/'"])prototypes\/artistos(?:\/|['"])/;

function scan(dir, findings) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) scan(path, findings);
    else if (entry.isFile() && extensions.test(entry.name)) {
      const source = readFileSync(path, 'utf8');
      if (fixtureReference.test(source)) findings.push(relative('.', path));
    }
  }
}

test('no application source references the private ArtistOS fixture', () => {
  const findings = [];
  const existingRoots = roots.filter(existsSync);
  assert.ok(existingRoots.length > 0, 'No application source roots found; refusing vacuous pass');
  for (const root of existingRoots) scan(root, findings);
  assert.deepEqual(findings, [], 'Fixture referenced from application source: ' + findings.join(', '));
});

test('synthetic ArtistOS content is absent from public static assets', () => {
  assert.ok(existsSync('public'), 'Missing public asset directory; refusing vacuous pass');
  const findings = [];
  function walkPublic(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) walkPublic(file);
      else if (entry.isFile()) {
        const rel = relative('.', file);
        if (/artistos|fixturepreview|demo[-_ ]musician/i.test(rel)) findings.push(rel);
        if (/\.(?:html?|css|js|mjs|json|svg|txt|xml|md)$/i.test(entry.name)) {
          const source = readFileSync(file, 'utf8');
          if (/ArtistOSFixturePreview|INTERNAL SYNTHETIC FIXTURE|NOT AN ARTIST PROFILE|Demo Musician/.test(source)) findings.push(rel);
        }
      }
    }
  }
  walkPublic('public');
  assert.deepEqual([...new Set(findings)], [], 'Synthetic fixture leaked into public assets');
});
