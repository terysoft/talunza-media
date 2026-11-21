import test from 'node:test';
import assert from 'node:assert/strict';
import {buildShortBrief} from '../lib/hook-lab.mjs';
const data=()=>({business:'TALUNZA Energy',offer:'custom solar installation',audience:'Shop owners',benefit:'power reliability',cta:'Message us for a quote',durationSec:30});
test('provides three hooks, four timed shots and editable SRT',()=>{
  const b=buildShortBrief(data());
  assert.equal(b.hooks.length,3);assert.equal(b.shots.length,4);
  assert.equal(b.shots[0].start,0);assert.equal(b.shots.at(-1).end,30);
  assert.match(b.srt,/00:00:03,000 --> 00:00:10,000/);
  assert.match(b.pasteText,/Message us for a quote/);
  assert.equal(b.estimatedPaidApiCostUsd,0);assert.equal(b.paidAIRequired,false);
  assert.equal(b.status,'DRAFT_UNVERIFIED');
});
test('15 second presets cover exactly 15 seconds without gaps',()=>{
  const b=buildShortBrief({...data(),durationSec:15});
  assert.deepEqual(b.shots.map(s=>[s.start,s.end]),[[0,2],[2,6],[6,11],[11,15]]);
  assert.match(b.srt,/00:00:11,000 --> 00:00:15,000/);
});
test('does not fabricate price, customer outcomes or trust statistics',()=>{
  const b=buildShortBrief(data());
  assert.doesNotMatch(b.pasteText,/99%|guaranteed|certified|500 customers|\$100/);
  assert.match(b.pasteText,/Verify claims or omit/);
});
test('handles user-provided descriptions without network or persistence',()=>{
  const input=data();const before=JSON.stringify(input);const a=buildShortBrief(input);
  const b=buildShortBrief(input);assert.deepEqual(a,b);assert.equal(JSON.stringify(input),before);
});
test('rejects missing, invalid, or extremely long fields',()=>{
  for(const change of [{business:''},{offer:'x'.repeat(200)},{benefit:null},{cta:'ab'},{audience:42}])
    assert.throws(()=>buildShortBrief({...data(),...change}));
});
test('only supported durations allowed; no surprising implicit coercion',()=>{
  for(const durationSec of [0,'15',30.5,120,-15])
    assert.throws(()=>buildShortBrief({...data(),durationSec}),RangeError);
});
test('sanitizes control characters in output and SRT',()=>{
  const b=buildShortBrief({...data(),offer:'solar\r\n panels\u0000 installed'});
  assert.doesNotMatch(b.pasteText,/\r|\u0000/);
  assert.match(b.offer,/solar panels installed/);
});
test('name that looks like HTML stays plain data, never markup',()=>{
  const b=buildShortBrief({...data(),business:'<script>alert(1)</script>'});
  assert.equal(b.business,'<script>alert(1)</script>');
});
