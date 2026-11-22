import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../' + path,import.meta.url),'utf8');

test('Only the Media homepage inherits the base homepage canonical',()=>{
  const root=read('app/layout.tsx');
  const home=read('app/page.tsx');
  assert.ok(!root.includes('alternates: { canonical:'));
  assert.ok(!root.includes('siteName: \'Talunza Media\', url:'));
  assert.ok(home.includes("mediaRouteMetadata('',"));
});

test('Each established Media public page has a unique canonical path',()=>{
  const slugs=['services','contact','production','academy','about','for-business','ai-video-training'];
  for(const slug of slugs){
    const layout=read('app/'+slug+'/layout.tsx');
    assert.ok(layout.includes('mediaRouteMetadata("'+slug+'",'),slug+' lacks unique canonical');
  }
  const helper=read('app/media-route-metadata.ts');
  assert.ok(helper.includes('alternates: {canonical}'));
  assert.ok(helper.includes('url: canonical'));
});

test('AI Studio drafts are preserved and do not inherit a forced nested canonical',()=>{
  const metadata=read('app/media-route-metadata.ts');
  assert.ok(!metadata.includes('ai-studio'));
  const main=read('app/ai-studio/page.tsx');
  assert.ok(main.includes('AIStudio'));
  // Canonicals for future /voice and /hook-lab pages are owned by those draft PRs.
});

test('Public quote pages use a local form, not a new backend or payment path',()=>{
  const contact=read('app/contact/page.tsx');
  const page=read('app/contact/MediaBriefBuilder.tsx');
  assert.ok(contact.includes('<MediaBriefBuilder/>'));
  assert.ok(page.includes('method="post" hidden={!hydrated}'));
  assert.ok(page.includes('setPrepared(null)'));
  assert.ok(!/(?:fetch\s*\(|XMLHttpRequest|payment|checkout)/i.test(page));
});
