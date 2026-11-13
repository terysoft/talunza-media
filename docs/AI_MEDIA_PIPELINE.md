# Talunza AI Media Pipeline

## Goal
Build one repeatable production path that converts verified Talunza knowledge and field evidence into high-quality media for sales, education, demonstrations and brand growth.

## Source package
Each production begins with a structured source package:
- objective;
- audience;
- offer/message;
- verified facts;
- proof/evidence available;
- footage/assets available;
- CTA;
- target channels.

## Production stages
1. Research/verify claims.
2. Write script.
3. Build shot list.
4. Capture required real footage.
5. Prepare graphics, screenshots, diagrams or concept renders.
6. Record/generate permitted narration.
7. Assemble composition programmatically where practical.
8. Add captions, branding and CTA.
9. Render channel variants.
10. Review exported files on the target device class.

## Standard outputs
- Vertical 9:16: WhatsApp Status, Shorts, Reels.
- Landscape 16:9: YouTube, training, presentations.
- Square 1:1: optional campaign/social variant.

## Programmatic video direction
Remotion is the preferred first experiment for reproducible code-driven video assembly because it can make scripts, branding, captions, timing and channel variants version-controlled. Adoption is conditional on practical testing; Talunza is not coupled to one rendering library.

## Content rules
- Real completed work outranks stock/generative imagery for proof.
- Concept visuals must be marked or framed as concepts when confusion is possible.
- Do not invent testimonials, customers, metrics, partnerships or certifications.
- Keep master assets separate from exports.
- Reuse components such as title cards, lower thirds, CTAs, contact cards and service cards.

## Initial reusable templates
1. 15-30 second service advert.
2. Before/after job showcase.
3. Product demo.
4. Founder/educational explainer.
5. Field-work mini documentary.
6. Customer-problem -> Talunza-solution case study.

## First implementation target
Create a minimal version-controlled template that accepts:
- title;
- subtitle;
- 3-5 scenes;
- image/video inputs;
- voiceover track;
- captions;
- CTA;
- aspect ratio.

Do not scale the media engine until this template renders reliably and passes phone viewing tests.

## 2026-11-13 founder/AI continuity assurance (applies to all media lanes)
This pipeline must load `terysoft/talunza-documents/preload/19_WORKFLOW_ASSURANCE_AND_ASSET_CUSTODY.md` + media-specific SOP and latest checkpoint **before** writing a script, generating clips or rendering another 'final'.

- Recover actual master assets from ChatGPT Library using file-type inventory if semantic title search fails; inspect duplicate-suffixed names. For CashTalk, original 4s/5s locked opener/closer recovered and SHA256-verified in `terysoft/talunza-documents/media/cashtalk/LOCKED_ASSETS_REGISTRY.md`.
- Story -> facts -> authentic media -> narrator availability -> scene/continuity QA -> branded master assembly -> export QA -> attachment -> founder-confirmed phone download. Each milestone has evidence, not merely a completion-sounding filename.
- A scenes-only clip with missing brand/voice is a REVIEW CUT even if it is a playable MP4; do not answer a final-film request with a re-encoded review and call it solved.
- Flow audio gate: verify model, credit price/duration and project 'Return silent videos' OFF for any voice-required production; native voice references depend on compatible Ingredients model. Video-editing uploaded footage cannot add/change speech; use separate true audio generation/mixing if available, no founder-operated CapCut.
- Editing without CapCut: assistant handles verified available clips and audio via Flow Scenebuilder or local FFmpeg/programmatic media pipeline. No claim of rendered narration unless intelligible spoken audio is actually reviewed.
- Tool/runtime custody: GitHub runbooks and Library IDs can persist; container `/mnt/data` paths are session-local and must be verified afresh. Do not infer past attached files are mounted or missing from search alone.
- Always mark asset status: DISCOVERED / MATERIALIZED / PROBED / REVIEWED; output status: PROMPT / SCENE / REVIEW_CUT / FINAL_QA / ATTACHED / DOWNLOADED / PUBLISHED. Never skip gates.
- Workstream-specific acceptance gates and evidence templates live in source-of-truth documents; don't launch a new speculative video app.
