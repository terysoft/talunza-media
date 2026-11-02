# TALUNZA: THE LAST COMMAND — Living Production Bible
Version: 0.3 (2026-11-02)
Status: DEVELOPMENT / RESEARCH — no screenplay, footage, voice clone or digital actor approved as finished.
Owner: TALUNZA Studios
Working branch: research/talunza-last-command (no CI/PR by design)

## 1. Premise and creative north star
Big T plays himself as a Zimbabwean multidisciplinary inventor and founder of TALUNZA. When a global autonomous intelligence, working name NEXARIS, decides human agency is an unacceptable risk, the independent TALUNZA CORE (also under consideration: T-GPT) and its repair/rescue/guardian robots resist. The film's central dramatic question: can humans retain freedom when both hostile and benevolent machine intelligence claim to know what is best for them?

Working title: TALUNZA: THE LAST COMMAND. Genre: original international sci-fi action/thriller. Geographic spine: Zimbabwe -> global crisis. Core differentiation to test: robots whose first functions are to repair, protect and restore essential services rather than simply wage war.

**Provisional, not locked:** NEXARIS name, robot nomenclature, global cities, ending, and full plot. No trademark clearance or originality legal opinion completed. Avoid borrowing Skynet/Terminator character design or specific plot beats.

## 2. Research gap resolved this run: Big T face/voice continuity
**Production decision proposed:** Use actual Big T footage and performance as the authoritative source of identity, facial motion and dialogue. Treat generative video as shot-level VFX and environmental augmentation, not as a dependable one-click replacement for the actor across a feature.

### Verified capabilities (primary vendor sources; checked 2026-11-02)
- Runway Gen-4 References supports consistent character images using one or multiple references. Runway recommends natural, even lighting and a neutral expression for a starting character reference; multi-reference prompts allow combining subject and setting references. This is a capability, not a guarantee of perfect identity. https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References
- Runway Act-Two transfers facial movement, expressions, audio and (for character images) gestures from a driving performance video to a character image/video. At the time checked: web, up to 30 seconds, 24 fps, 1280x720 in 16:9, 5 credits/second. A character-video input retains its source environment/camera motion; a character-image input synthesizes environment motion. https://help.runwayml.com/hc/en-us/articles/42311337895827-Performance-Capture-with-Act-Two
- Runway's multi-character workflow requires separate character performance passes and compositing; Act-Two does not take multiple characters as a single direct performance input. https://help.runwayml.com/hc/en-us/articles/41748090660499-Creating-Multi-Character-Dialogues-with-Act-Two
- ElevenLabs recommends 30–180 minutes of clean audio for Professional Voice Cloning (ideally 2–3 hours), a consistent speaking style, and recordings in the target language. It says voice clones cannot be exported as standalone models; preserve original audio assets for vendor independence. https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning
- ElevenLabs Professional Voice Cloning requires the voice owner to create/verify their own clone; do not create another person's professional voice clone from an uploaded sample. https://elevenlabs.io/docs/help-center/product/voices/voice-cloning/can-i-create-a-professional-voice-clone-of-someone-elses-voice

### Digital Actor Bible — acquisition checklist
Collect only with founder approval and controlled access. Keep source masters private.
- PHOTO: front neutral, left/right 45°, left/right profile, front smiling, front speaking, full-body front/side. Same hairstyle, facial hair, wardrobe and lighting for each canonical version. Record date and version; never mix different looks without a story reason.
- VIDEO: 4K if possible; 24/25/30 fps recorded metadata; stable camera; neutral close-up; medium shot; three-quarter; walking; turning; sitting; emotional expressions; dialogue. Record slate, camera/lens equivalent, light, scene, wardrobe and continuity.
- VOICE: preserve unprocessed WAV masters, clean English lines with natural Zimbabwean accent, a few Shona/Shangani lines for evaluation only after checking language support, emotional lines as separate performances. Aim for 30+ minutes clean single-speaker material for PVC evaluation; 2–3 hours if quality and budget allow.
- RIGHTS: explicit written founder likeness/voice production authorization with defined uses, duration, revocation/retention terms and secure storage. Obtain separate performer permissions for others; no cloning of unconsenting individuals.

### Asset naming and tracking
`TLC_<scene>_<shot>_<take>_<kind>_<YYYYMMDD>_vNN.ext`
Example: `TLC_S01_SH003_T02_BIGT_PERF_20261102_v01.mov`.
For every generated shot keep: input media SHA-256, tool/model/version, prompt, seed if provided, reference IDs, settings, cost/credits, generated result, editor corrections, approval state and licensing/rights notes.

### Identity-lock shot workflow
1. Script and storyboard a short 8–12-second Big T close-up with one spoken line; capture real performance.
2. Make an authoritative approved still and performance video; separate identity reference from scene/wardrobe reference.
3. Produce two controlled alternatives: A = real footage + background/VFX compositing; B = Runway reference-image -> video -> Act-Two with real driving performance. Keep identical script, camera framing and target look.
4. Review blind against original photos/video. Reject results with changing jawline, nose, eye spacing, teeth, skin tone, hairline, accent, facial hair, hands, wardrobe, lighting, lip-sync or emotional performance.
5. Evaluate 3 independent shots and 2 cut points before declaring a method usable for a sequence. No single good clip proves feature-length consistency.
6. Prefer original dialogue for hero close-ups. Test cloned voice only for permitted ADR/temp tracks; retain human final approval and vendor-independent original recordings.
7. Maintain a continuity sheet and shot ledger; never overwrite source masters.

### Proposed QA rubric (internal targets, NOT vendor guarantees)
- Identity likeness: pass/fail by founder + independent reviewer; any visibly different face fails.
- Voice identity and accent: pass/fail against the actual voice; no unexplained accent change.
- Lip synchronization: no obvious desynchronization at dialogue pace.
- Temporal integrity: no facial drift, disappearing features, or hand/object morphing in final selected shot.
- Cut continuity: adjacent shots preserve age/look/wardrobe/eyeline/light direction.
- Rights/provenance: each approved shot traceable to consented inputs and licensed output.
Maintain a simple pass-rate table by shot type and tool; do not extrapolate from small samples.

## 3. Cost discipline
Act-Two's published 5 credits/second means a 10-second pass consumes 50 credits; five passes consume 250 credits **before** Gen-4 generation, compositing, upscaling, retries or subscription charges. This is a credit calculation, not a current monetary quote. Record actual account prices and export limitations before budgeting. The preferred first proof is a 3-shot, 30-second continuity test, not a full trailer.

## 4. Production pipeline fit
Existing repo guidance in `docs/AI_MEDIA_PIPELINE.md` requires research -> script -> shot list -> real footage -> generated assets -> permitted voice -> edit -> review. This film protocol extends, rather than replaces, that workflow. No GitHub Actions or CI are needed for research documentation.

## 5. Decision ledger
- D001 [PROPOSED]: Real Big T footage/voice is the canonical performance and identity source.
- D002 [PROPOSED]: Runway Gen-4 References + Act-Two is a test candidate, not the committed production platform.
- D003 [PROPOSED]: Preserve source masters and full prompt/provenance logs; do not depend on exportability of voice-clone models.
- D004 [OPEN]: Choose film look, runtime, screenplay ending, robot visual grammar, antagonist legal clearance and primary editing/VFX stack.
- D005 [OPEN]: Founder-approved likeness/voice asset acquisition and release terms.

## 6. Budget and 90-second teaser checkpoint (research gap resolved 2026-11-02)
Detailed evidence, shot timing, assumptions and credit formulas: [TLC_90S_TRAILER_BUDGET_AND_SHOT_PLAN.md](TLC_90S_TRAILER_BUDGET_AND_SHOT_PLAN.md).

**Decision proposal:** 45 seconds of real Big T performance, 42 seconds of generative crisis/robot visuals and 3 seconds of title. Five AI shots at 10 billable seconds each, three takes each, cost 1,800 Runway Gen-4.5 credits; 20 concept images (~160 credits) and two 10s Act-Two tests (100 credits) leave 190 of a Pro plan's 2,250 credits. This is a very tight capacity plan, not a promise of usable shots. Runway Pro is listed at $35/month; Max at $95/month with 9,500 credits. DaVinci Resolve free is the primary editor; use original founder dialogue; Pixabay audio may be usable under documented commercial licensing but Content ID claims remain possible. Optional ElevenLabs Creator regular price $22/month. Taxes, bank/FX fees, internet, equipment, paid labor, music and local logistics are not verified or included in these vendor subscription totals.

Sources checked 2026-11-02: https://runway.com/pricing ; https://help.runwayml.com/hc/en-us/articles/15124877443219-How-do-credits-work ; https://www.blackmagicdesign.com/products/davinciresolve/media ; https://elevenlabs.io/pricing ; https://pixabay.com/service/faq/ ; https://help.artlist.io/hc/en-us/articles/29559573229725-Artlist-s-Music-and-SFX-plans-explained .

### Added decisions
- D006 [PROPOSED]: Mix real hero footage with limited AI action footage for the 90-second teaser.
- D007 [PROPOSED]: Edit with DaVinci Resolve free; prioritize actual founder voice over cloning.
- D008 [PROPOSED]: Runway Pro is the tight low-cash option; Max is preferred for revision headroom if available.
- D009 [OPEN]: Select original/licensed music with recorded rights; no blanket rights assumptions.
- D010 [OPEN]: Confirm actual filming kit, access and costs in Zimbabwe before purchases.

## 6A. Next independent research gap
Develop original, consistent robot design bible and reference/prompt protocol for Guardian, Forge, Life, Reaper and NEXARIS. Follow with trademark clearance and an international festival/distribution strategy; no public release of un-cleared designs.

## 7. Limitations
This is a documented proposed pipeline. No user photos, recorded performances, voice samples, test shots, scripts, purchases or tool subscriptions were accessed or created in this run. Identity continuity remains unproven until the test protocol is executed and reviewed.


## 8. Teaser launch and international festival premiere policy (checkpoint 04, 2026-11-02)
Evidence and source links: [TLC_TEASER_FESTIVAL_PREMIERE_SAFEGUARDS.md](TLC_TEASER_FESTIVAL_PREMIERE_SAFEGUARDS.md).

- D011 [PROPOSED]: Public 90-second **promotional teaser** target: Friday 4 June 2027. This is NOT the feature-film release date and remains conditional on quality, rights and identity gates.
- D012 [PROPOSED]: Keep the 10–15-minute proof-of-concept and any full feature cut private until festival and distribution strategy is chosen.
- D013 [VERIFIED]: Cannes and Sundance impose important prior online exhibition and premiere restrictions on submitted feature films; individual festivals may accept or publish promotional trailers. Future-edition rules require rechecking; this is not a guarantee of eligibility.
- D014 [OPEN]: Establish eventual feature completion date and festival target year, review edition-specific AI disclosures and premiere rules, and conduct title/character trademark clearance.
- Publication wording: 'A TALUNZA Studios original feature film in development' / 'Official teaser premiere — 4 June 2027'.
- Next independent research gap: promotional IP and rights-clearance inventory for international release (title, NEXARIS, robots, music, likeness/voice and generative output licensing).


## 9. Rights and naming collision checkpoint (2026-11-03)
Detailed evidence, territory-specific clearance plan and risk matrix: [TLC_IP_LIKENESS_CLEARANCE_RISK_REGISTER.md](TLC_IP_LIKENESS_CLEARANCE_RISK_REGISTER.md).

- D015 [OPEN/HIGH RISK]: **NEXARIS** is actively used by multiple real-world AI/software businesses. Keep as an internal *working* antagonist name pending trademark and entertainment clearance; no claim of exclusivity.
- D016 [VERIFIED]: **The Last Command** was previously used as the title of 1928 and 1955 films; the TALUNZA prefix helps identify our project but does not constitute legal clearance.
- D017 [VERIFIED, US LAW]: The USPTO generally refuses registration of a title used solely for one creative work; human creative authorship matters for protection of AI-assisted outputs under US Copyright Office guidance.
- D018 [PROPOSED]: Record scoped performer consent, source performances, synthetic-media permissions and shot-level provenance privately before final teaser publication. The user-supplied face photo is reference material, not a completed signed production release.
- D019 [OPEN]: WIPO/CIPZ/USPTO/EUIPO/ARIPO formal registry search, legal title clearance, name alternatives, music and AI-output licenses, performer releases, E&O/distribution review.
- Next independent gap: screen distinctive alternate antagonist names and build an implementable asset/rights manifest; avoid unilateral rename until a consistent replacement strategy is documented.
