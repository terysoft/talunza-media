import {Footer,Header,PageHero,whatsapp} from '../site';
import MediaBriefBuilder from './MediaBriefBuilder';

export default function Contact(){return <main><Header/>
  <PageHero kicker="CONTACT" title="Tell us what you need produced." copy="Share the project type, location, deadline and where the finished work will be used. We will discuss scope and availability before quoting."/>
  <section className="section"><MediaBriefBuilder/></section>
  <section className="section process"><p className="eyebrow dark">OTHER WAYS TO GET IN TOUCH</p>
    <h2>Talk to the production team.</h2>
    <div className="academyGrid">
      <article><h3>WhatsApp</h3><p>Send photos, reference videos, questions or a prepared project brief.</p><a className="textLink" href={whatsapp}>Message 0777 323 918 →</a></article>
      <article><h3>Phone</h3><p>Discuss location, availability and the type of work required.</p><a className="textLink" href="tel:+263777323918">Call 0777 323 918 →</a></article>
      <article><h3>What helps us quote</h3><p>Audience · location · deadline · target channels · intended deliverables · references · available footage and materials.</p></article>
      <article><h3>Coverage</h3><p>Chiredzi and the Lowveld first, with other locations assessed according to scope, travel and availability.</p></article>
    </div>
  </section><Footer/></main>}
