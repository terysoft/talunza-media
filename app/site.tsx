const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const whatsapp = 'https://wa.me/263777323918?text=Hello%20Talunza%20Media%2C%20I%20would%20like%20to%20discuss%20a%20project.';

export { base, whatsapp };

export function Header(){
  return <header className="nav"><a className="brand" href={`${base}/`}><img src={`${base}/talunza-logo.svg`} alt="Talunza"/></a><nav><a href={`${base}/production/`}>Production</a><a href={`${base}/ai-studio/`}>AI Studio</a><a href={`${base}/academy/`}>Academy</a><a href={`${base}/for-business/`}>For Business</a><a href={`${base}/services/`}>Services</a><a href={`${base}/about/`}>About</a></nav><a className="navCta" href={whatsapp}>Start a project</a></header>
}

export function Footer(){
  return <footer><img src={`${base}/talunza-logo.svg`} alt="Talunza"/><p>Media Production · AI Studio · Academy</p><div className="footerLinks"><a href={`${base}/ai-video-training/`}>AI video training</a><a href={`${base}/for-business/`}>For business</a><a href={`${base}/contact/`}>Contact</a><a href="https://talunza.co.zw">Talunza main site</a></div></footer>
}

export function PageHero({kicker,title,copy}:{kicker:string,title:string,copy:string}){
  return <section className="pageHero"><p className="eyebrow">{kicker}</p><h1>{title}</h1><p className="lede">{copy}</p><div className="actions"><a className="primary" href={whatsapp}>Discuss your project</a><a className="secondary" href={`${base}/contact/`}>Contact options</a></div></section>
}
