# TALUNZA Media — next online asset, quote-first reliability and SEO audit

**Date:** 2026-11-22
**Scope:** `terysoft/talunza-media` on isolated `fix/media-quote-intake-safe-20261122` branch based on `main` `d4b09d1b05367a58669e0b3457f644301acdcd3d`.
**Release posture:** draft review only; no main merge, deployment, DNS change or paid CI.

## Verified current source and public surface

- Existing public `/media/` page advertises phone-first production, AI Studio and Academy, with services for events, short adverts, creators, interviews, media training and business content. These are quote-based engagements; do not invent published packages or claims of completed client results.
- The independently probed `https://studio.talunza.co.zw/` and `https://talunza.co.zw/studio` URLs could not be accessed from the external checker. This is **not** a definitive availability or DNS diagnosis; no DNS/Caddy/SSL changes are authorised by this branch. Existing Media site's internal `/ai-studio/` path remains the current source-defined studio landing route.
- Existing draft PR #6 owns AI Voice under `app/ai-studio/voice/` and changes `app/ai-studio/page.tsx` and sitemap; PR #7 stacks on #6 with Hook Lab and changes the same studio page. Security draft PR #3 patches framework dependencies. **No files touched in those active PR #6/#7 feature scopes or #3 dependency scope.**

## Concrete bug 1: wrong WhatsApp service-specific enquiries

Original `app/services/page.tsx` built each service URL by appending `&text=` to a shared WhatsApp URL which **already contained `?text=`**, creating duplicate text query keys. Depending on the consumer, the service-specific request could be ignored or misread.

### Corrected

- Pure provider-neutral `lib/media-enquiry.mjs` formats the project category, location, deadline, delivery format and free-text brief. Input is locally cleaned and length-bounded. Unknown categories are rejected.
- All nine Media service cards now use the same `mediaWhatsAppUrl({category})`, with **exactly one** encoded `text` parameter and the selected service. The direct WhatsApp call remains user-initiated; a second clearly labelled link opens the Media Contact quote form.
- The two primary Media homepage actions now route to the Contact brief (`/contact/#media-brief-title` through the existing configured `basePath`) instead of opening WhatsApp before collecting requirements. Direct WhatsApp remains available in the persistent site navigation, Contact route and service-specific links.
- New `app/contact/MediaBriefBuilder.tsx` client-side draft builder collects category, location, deadline, desired channels and project details; preview appears **only after explicit Prepare my message click**; editing a field invalidates the old prepared link. The user clicks the separate outbound link to open WhatsApp. No backend, automatic send, account login, billing, localStorage or recording was added.
- With JavaScript absent, the input form remains hidden and a direct WhatsApp contact alternative is provided. Text stays locally in React state until the visitor chooses the outbound link; the existing platform-level analytics script may still log page visits and should be independently audited, but the new builder never sends form data to it.

## Concrete bug 2: inherited canonical URL

Original `app/layout.tsx` placed the Media homepage canonical and Open Graph URL in the root metadata. Next.js 15 child routes without their own metadata inherit those fields, causing service and contact pages to appear canonically identical to the homepage. See official [Next.js 15 metadata merging documentation](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata).

### Corrected

- Removed the root homepage canonical and root Open Graph `url` field. The Media homepage now declares its unique canonical/OG URL through `mediaRouteMetadata('', ...)`.
- Added route-local static metadata for `/services/`, `/contact/`, `/production/`, `/academy/`, `/about/`, `/for-business/`, `/ai-video-training/`, using configured `NEXT_PUBLIC_SITE_URL` (default `https://talunza.co.zw/media`), consistent with the existing static-export and `NEXT_PUBLIC_BASE_PATH` routing strategy.
- **Known follow-up:** AI Studio, Voice and Hook Lab routes need unique metadata as part of their already active feature PRs. We intentionally do not overwrite `app/ai-studio/page.tsx` or modify the active Studio drafts. The former wrong shared homepage canonical is no longer inherited, but this branch alone does not finish SEO for pending Studio routes.

## Verification and founder gates

- `tests/media-enquiry.test.mjs` (5 checks) covers ten categories, exactly one query parameter and proper decoding, invalid categories, input cleaning, duplicate-text regression and private no-JS fallback.
- `tests/media-seo.test.mjs` (4 checks) covers root canonical removal, seven static unique routes, Studio-owner boundaries and private contact integration.
- To avoid colliding with active Media security PR #3's dependency/package edits, **`package.json` is unchanged**. `bash scripts/check-media-asset.sh` runs `npm run typecheck`, both Node contract tests and `npm run build` with fail-fast semantics; no CI pipeline added.
- Connected GitHub exact-source audit and isolated V8 execution of pure message formatter: all ten categories generated a single service-specific encoded URL, unknown category rejected, control characters removed and 1000-character description cap enforced. Test source syntax checked. **No actual Node `npm run check`, TypeScript compiler, or Next static export has run on founder laptop for this branch.**
- Next founder/human gate: verify pinned remote SHA in independent WSL worktree; run `npm run check`; inspect generated route `/contact/` and `/services/` under actual configured base path with desktop browser; test prepare → review → outbound WhatsApp without sending; confirm unique canonical tags in exported HTML; verify no interference with Studio PR #6/#7 and security PR #3.
- This branch does not alter `talunza-home` V4's frozen desktop candidate or other site deployments. Domain/subdomain routing requires a later approved infrastructure plan.

## Commercial and content standards

Media is more than AI video: it includes real capture, production, editing, storytelling and learning. Quotes must specify deliverables, revision expectations, turnaround, travel/material needs and customer approval as applicable; avoid fictional portfolio or guaranteed results. Cross-refer Technical Services, software or Academy only when relevant to the actual media enquiry.
