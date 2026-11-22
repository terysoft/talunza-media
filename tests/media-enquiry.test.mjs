import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mediaMessage,mediaWhatsAppUrl,MEDIA_CATEGORIES} from '../lib/media-enquiry.mjs';

test('Each production service creates one valid WhatsApp message parameter',()=>{
  assert.equal(MEDIA_CATEGORIES.length,10);
  for(const category of MEDIA_CATEGORIES){
    const fields={category,location:'Chiredzi',details:'Make a 20-second promo for WhatsApp Status.'};
    const parsed=new URL(mediaWhatsAppUrl(fields));
    assert.equal(parsed.origin,'https://wa.me');
    assert.equal(parsed.pathname,'/263777323918');
    assert.deepEqual([...parsed.searchParams.keys()],['text']);
    assert.equal(parsed.searchParams.get('text'),mediaMessage(fields));
    assert.ok(parsed.searchParams.get('text').includes('Project: '+category));
  }
});

test('Unknown project categories are never sent as valid service requests',()=>{
  assert.throws(()=>mediaMessage({category:'Not an approved service'}),/valid media project type/);
  assert.throws(()=>mediaWhatsAppUrl({category:''}),/valid media project type/);
});

test('Control characters are stripped and very long free text is bounded',()=>{
  const message=mediaMessage({category:'Training',location:'Chiredzi\n\rArea',details:'x'.repeat(2000)});
  assert.ok(message.includes('Location: Chiredzi Area'));
  assert.ok(!message.includes('\r'));
  const detail=message.split('Brief: ')[1].split('\n')[0];
  assert.equal(detail.length,1000);
});

test('The public service cards cannot accidentally append a second text parameter',()=>{
  const page=fs.readFileSync(new URL('../app/services/page.tsx',import.meta.url),'utf8');
  assert.ok(page.includes('mediaWhatsAppUrl({category:t})'));
  assert.ok(page.includes('/contact/#media-brief-title'));
  assert.ok(!page.includes('&text=${'));
});

test('The client quote form is manual, local and safe when scripts are disabled',()=>{
  const page=fs.readFileSync(new URL('../app/contact/MediaBriefBuilder.tsx',import.meta.url),'utf8');
  assert.ok(page.includes("'use client'"));
  assert.ok(page.includes('event.preventDefault()'));
  assert.ok(page.includes('hidden={!hydrated}'));
  assert.ok(page.includes('setPrepared(null)'));
  assert.ok(page.includes('prepared &&'));
  assert.ok(page.includes('<noscript>'));
  assert.ok(page.includes('rel="noopener noreferrer"'));
  assert.ok(!/(?:fetch\s*\(|localStorage|sendBeacon|XMLHttpRequest)/.test(page));
});
