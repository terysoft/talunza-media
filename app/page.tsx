const whatsapp = 'https://wa.me/263777323918?text=Hello%20Talunza%20Media%2C%20I%20would%20like%20to%20discuss%20a%20media%20or%20AI%20project.';
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const pillars = [
  {
    title: 'Media Production',
    copy: 'Phone-first filming and production for weddings, events, dramas, interviews, creator content, adverts and business stories — planned around the real location, people and message.'
  },
  {
    title: 'AI Studio',
    copy: 'Selective AI assistance for scripting, storyboards, graphics, subtitles, voice, music, visual effects, editing support and campaign assets — used where it genuinely improves the work.'
  },
  {
    title: 'Academy',
    copy: 'Practical AI and media training for creators, workers, entrepreneurs, schools and communities who want to produce better work, learn useful tools and create new income opportunities.'
  }
];

const work = [
  'Weddings & events', 'Short films & local drama', 'Interviews & profiles', 'Business adverts',
  'Creator videos', 'Training content', 'Photography & visual stories', 'Social media campaigns'
];

const ai = [
  'Script & concept development', 'Storyboards and shot planning', 'Subtitles and transcription',
  'Graphics and promotional artwork', 'Voice and audio enhancement', 'Music ideation',
  'Editing assistance', 'VFX experimentation', 'Content repurposing', 'Campaign copy and distribution support'
];

export default function HomePage() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top"><img src={`${assetBase}/talunza-logo.svg`} alt="Talunza" /></a>
        <nav>
          <a href="#media">Media</a><a href="#studio">AI Studio</a><a href="#academy">Academy</a><a href="#work">What we make</a>
        </nav>
        <a className="navCta" href={whatsapp}>Start a project</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">TALUNZA MEDIA · ZIMBABWE</p>
          <h1>Real stories. Better production. Smarter tools.</h1>
          <p className="lede">We combine practical filming, editing and storytelling with selective AI tools to help people and organisations create work that looks stronger, communicates clearly and travels further.</p>
          <div className="actions"><a className="primary" href={whatsapp}>Discuss your project</a><a className="secondary" href="#media">Explore what we do</a></div>
          <p className="micro">Not “AI-only”. We shoot real people, real places and real work — then use technology where it adds value.</p>
        </div>
        <div className="heroPanel">
          <div className="frame"><span>01</span><strong>Capture</strong><small>Phone-first production</small></div>
          <div className="frame"><span>02</span><strong>Craft</strong><small>Edit, design, sound</small></div>
          <div className="frame"><span>03</span><strong>Amplify</strong><small>AI-assisted finishing & distribution</small></div>
        </div>
      </section>

      <section className="section" id="media">
        <p className="eyebrow dark">THREE CONNECTED PILLARS</p>
        <h2>Production, intelligence and skills in one creative system.</h2>
        <div className="cards">
          {pillars.map((p) => <article className="card" key={p.title}><h3>{p.title}</h3><p>{p.copy}</p></article>)}
        </div>
      </section>

      <section className="section split" id="work">
        <div><p className="eyebrow dark">MEDIA PRODUCTION</p><h2>Made for the world people actually live and work in.</h2><p className="copy">We start with the story, audience, location and available resources. A strong phone setup, good sound, disciplined shooting and intelligent editing can produce serious work without pretending every project needs a cinema truck.</p></div>
        <div className="chips">{work.map(x => <span key={x}>{x}</span>)}</div>
      </section>

      <section className="section darkSection" id="studio">
        <p className="eyebrow">AI STUDIO</p><h2>AI is part of the toolkit — not the whole identity.</h2>
        <p className="copy light">We use AI selectively to reduce friction, explore ideas faster and raise production quality. Human judgement, real footage and the purpose of the project stay in control.</p>
        <div className="chips darkChips">{ai.map(x => <span key={x}>{x}</span>)}</div>
      </section>

      <section className="section" id="academy">
        <p className="eyebrow dark">TALUNZA ACADEMY</p><h2>Learn tools by making useful things.</h2>
        <div className="academyGrid">
          <article><h3>AI for everyday work</h3><p>Prompting, research, writing, planning, automation and practical assistants.</p></article>
          <article><h3>Phone media production</h3><p>Framing, sound, lighting, interviews, shot planning, editing and publishing.</p></article>
          <article><h3>Creator & business workflows</h3><p>Turn one idea or shoot into multiple useful formats for WhatsApp, social media, websites and campaigns.</p></article>
          <article><h3>Earn with new skills</h3><p>Training is tied to practical services, portfolio building and real commercial opportunities rather than certificates alone.</p></article>
        </div>
      </section>

      <section className="section process">
        <p className="eyebrow dark">HOW PROJECTS START</p><h2>Tell us what you want people to see, feel or understand.</h2>
        <div className="steps"><div><b>1</b><h3>Brief</h3><p>Goal, audience, location, deadline and available material.</p></div><div><b>2</b><h3>Plan</h3><p>Concept, shot list, script, crew needs and delivery format.</p></div><div><b>3</b><h3>Produce</h3><p>Capture, edit, enhance and review.</p></div><div><b>4</b><h3>Deliver</h3><p>Final files prepared for the channels that matter.</p></div></div>
      </section>

      <section className="cta">
        <p className="eyebrow">START WITH THE IDEA</p><h2>Have a wedding, advert, drama, interview, training idea or AI project?</h2>
        <p>Send the idea first. We will help shape the right production approach before quoting.</p>
        <div className="actions"><a className="primary" href={whatsapp}>WhatsApp Talunza Media</a><a className="secondary" href="tel:+263777323918">Call 0777 323 918</a></div>
      </section>

      <footer><img src={`${assetBase}/talunza-logo.svg`} alt="Talunza"/><p>Media Production · AI Studio · Academy</p><a href="https://talunza.co.zw">talunza.co.zw</a></footer>
    </main>
  );
}
