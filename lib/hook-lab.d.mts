export interface StudioHook { id: string; label: string; text: string }
export interface StudioShot { start: number; end: number; role: string; visual: string; caption: string }
export interface StudioBrief {
  kind: 'talunza.studio.short_brief.v1'; status: 'DRAFT_UNVERIFIED';
  business: string; offer: string; audience: string; benefit: string; cta: string;
  durationSec: 15 | 30; source: 'USER_SUPPLIED_INPUT_ONLY';
  estimatedPaidApiCostUsd: 0; paidAIRequired: false;
  hooks: readonly StudioHook[]; shots: readonly StudioShot[];
  srt: string; pasteText: string; limitations: string;
}
export interface StudioInput { business: string; offer: string; audience: string; benefit: string; cta: string; durationSec: 15 | 30 }
export function buildShortBrief(input: StudioInput): StudioBrief;
