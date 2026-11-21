# TALUNZA Media / Studio — Free Hook Lab (21 November 2026)

**Status:** source-implemented and isolated zero-dependency engine tested; stacked on Media PR #6, not deployed. Product URL on publication would be `/ai-studio/hook-lab/` within the existing Media base path. Source route remains `noindex` until real user/editorial QA.

## Why this is the free-first wedge

A small Zimbabwean business can enter its name, product/service, audience, customer problem and call to action and instantly receive:

- three distinct starting-hook templates (problem-first, show-first, question-first);
- a shot-by-shot 15- or 30-second plan with the first 2–3 seconds made explicit;
- proposed caption text and **sample** SRT timing for editors;
- copyable briefing text to hand to a filmmaker or a simple phone editor;
- optional paid **human production service** CTA, not a requirement to use the planner.

This is a genuine working in-browser deterministic service, **not** AI-generated video, a transcription system, a guaranteed engagement optimizer, or a model-powered generator. Local core requires no account, third-party API call, credit budget or TALUNZA server for generation once the page is loaded. It does not itself send the entered business text to a server; website-wide scripts and hosting still require a normal privacy check before launch.

## Ownership and architecture

- `lib/hook-lab.mjs` owns pure deterministic brief creation and sample SRT. `lib/hook-lab.d.mts` is the TypeScript consumer contract.
- `app/ai-studio/hook-lab/HookLabClient.tsx` owns browser interaction, visible draft states and clipboard-copy buttons. The selected hook updates the visible shot and sample SRT; no implicit publish/send.
- `app/ai-studio/hook-lab/page.tsx` and CSS module own a responsive route under **existing Media AI Studio**, no new repository, host, service or paid subscription.
- `app/ai-studio/page.tsx` adds a discoverable link to this draft route alongside the existing voice offering.
- Real footage and generated assets, voice rights, client consents, deliverables, billing and verified KPI results remain owned by their existing Media/Business processes.

## Verification evidence

Local Node unit command:

```sh
node --test tests/hook-lab.test.mjs
```

**8/8 PASS**, covering three hooks, shot durations, sample SRT, no fabricated statistics, invalid input, output sanitization, deterministic output and no mutation of caller inputs. TypeScript's transpilation of the two TSX pages completed with **zero syntax diagnostics** using an installed TypeScript 5.x toolchain. New engine/tests/UI/route/CSS/typing blob hashes were compared to locally tested or transpiled source files before PR creation.

**Not run:** full Next.js typecheck/build, browser rendering, end-to-end page tests, human copy review in Zimbabwe languages, actual SRT sync to footage, mobile Lighthouse, existing basePath deployment, production metrics, consent review, real sale/quote pilot.

## Adoption/marketing plan

1. Ship source only as a draft until Media's existing security PR #3 and Studio PR #6 have been reviewed; avoid concurrent file edits or production publication.
2. Run full `npm ci && npm run check` on a clean checkout with the compatible Next/React security patch; do not pay for CI.
3. Review mobile screenshots 360px and 412px, keyboard/voiceover accessibility, copy-to-clipboard fallback and real consent/rights notice.
4. Validate hooks with a local business sample (with permission), film one real 15-second vertical spot, compare effort and retention against their existing workflow. No automatic claim of higher engagement.
5. Offer optional editing/voiceover/filming through current Studio service catalogue; leave the core planning tool free. Optional future cloud AI can enrich drafts **only** through the accepted provider-neutral adapter, private-data policy and cost/approval limits.

## Safeguards

No fake testimonials, ratings, earnings, certifications, verified price, generated voice clone, auto-posting, stolen footage, copyrighted music, event/eventual billing, AI credit spend or provider key. All output explicitly DRAFT_UNVERIFIED; sample caption timing needs human adjustment. Avoid linking to a live page until deployed.

## Rollback

Revert this isolated feature branch; existing Studio/Voice routes remain unchanged on their owning PR branch.
