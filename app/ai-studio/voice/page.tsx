import type { Metadata } from 'next';
import { Footer, Header, PageHero, whatsapp } from '../../site';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://talunza.co.zw/media').replace(/\/$/, '');

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/ai-studio/voice/` },
  title: 'AI Voiceovers, Narration & Audio Production in Zimbabwe',
  description: 'TALUNZA Studio offers scripted voiceovers, narration, audio clean-up and multilingual audio production for Zimbabwean businesses and creators, with consent and human review.',
};

const offers = [
  ['Advertising voiceovers', 'Short scripts for WhatsApp Status, radio-style announcements, vertical video and product explainers.'],
  ['Narration and training audio', 'Approved company training, tutorial narration, explainers and accessible audio versions of existing content.'],
  ['Local-language production', 'English, Shona and mixed-language scripts with careful pronunciation testing and a human language review. Availability depends on the exact voice, model and script.'],
  ['Audio cleanup and subtitles', 'Work on audio customers own or are permitted to use, with correction, speaker labels and subtitles where the source quality permits.'],
  ['Dubbing and localisation', 'Quoted, rights-cleared localisation projects. We verify actual model/language support rather than promising one-click coverage.'],
  ['Business voice workflows', 'Explore voice-note transcription and customer assistants through TALUNZA Business and Capture; these are scoped pilot services, not an always-on automated phone line.'],
];

export default function VoiceServices() {
  return <main>
    <Header/>
    <PageHero kicker="TALUNZA STUDIO / VOICE" title="Give your message a voice worth hearing." copy="Human-led scripting, carefully selected AI audio tools and practical finishing for businesses, creators and educators. We quote the finished result, not a promise of unlimited AI generation."/>
    <section className="section">
      <div className="sectionHead"><p className="eyebrow dark">VOICE & AUDIO SERVICES</p><h2>Choose the outcome, not the model.</h2></div>
      <div className="cards">{offers.map(([name,detail]) => <article key={name} className="card"><h3>{name}</h3><p>{detail}</p></article>)}</div>
    </section>
    <section className="section darkSection">
      <div className="split">
        <div><p className="eyebrow">HOW WE WORK</p><h2>Real approval. Clear rights. Quality first.</h2></div>
        <div>
          <p className="copy light">Send the idea, intended audience, language, approximate length and any existing footage or script. We agree on the scope, check permission for any real voice or copyrighted recording, create a review draft, correct pronunciation and deliver the approved file.</p>
          <div className="chips darkChips"><span>English & Shona review</span><span>Script approval</span><span>Voice consent</span><span>Human quality check</span><span>Rights-aware delivery</span><span>Revision scope agreed</span></div>
        </div>
      </div>
    </section>
    <section className="section">
      <p className="eyebrow dark">REQUEST A QUOTE</p>
      <h2>A short brief is enough to begin.</h2>
      <p className="copy">Tell us what you want to advertise or explain, where it will be published, the language, approximate duration, deadline and whether you already have audio. No confirmed order, artificial voice clone or live agent is created by contacting us.</p>
      <div className="actions"><a className="primary" href={whatsapp}>Discuss audio production on WhatsApp</a></div>
    </section>
    <Footer/>
  </main>;
}
