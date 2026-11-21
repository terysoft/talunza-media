import type {Metadata} from 'next';
import {Header,Footer,PageHero,whatsapp} from '../../site';
import HookLabClient from './HookLabClient';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL??'https://talunza.co.zw/media').replace(/\/$/,'');
export const metadata:Metadata={
  title:'Free Short-Video Hook & Shot Planner — TALUNZA Studio',
  description:'Create a free, local-first 15 or 30 second short-video hook, shot plan and sample captions for Zimbabwean business advertising. No paid AI required.',
  alternates:{canonical:`${siteUrl}/ai-studio/hook-lab/`},
  robots:{index:false,follow:false},
};
export default function HookLabPage(){
  return <main><Header/><PageHero kicker="FREE TOOL / STUDIO" title="A strong advert starts in the first three seconds." copy="Plan a short vertical video for your business with free hooks, real-footage shot ideas, and editable subtitle timing. No credits, no account, no hidden AI bill."/>
    <section className="section"><HookLabClient/></section>
    <section className="section darkSection"><h2>Need us to produce the finished video?</h2><p className="copy light">Our paid studio service can help with real filming, approved AI-assisted scenes, voiceover, subtitles and editing. The free planner is yours to use without purchasing anything.</p><div className="actions"><a className="primary" href={whatsapp}>Discuss a production brief</a></div></section>
    <Footer/></main>;
}
