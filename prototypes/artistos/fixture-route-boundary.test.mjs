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
  for (const root of roots) if (existsSync(root)) scan(root, findings);
  assert.deepEqual(findings, [], 'Fixture referenced from application source: ' + findings.join(', '));
});
