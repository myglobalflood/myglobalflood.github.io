import { SiteFrame } from "./components/site-frame";

export default function Home() {
  return (
    <SiteFrame active="home" home flow>
      <main className="home-main">
        <section className="hero">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-kicker hero-load">
            <span>36.03° N · 103.83° E</span>
            <span>Lanzhou University</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow hero-load">Floods &amp; Global Change</p>
            <h1 className="hero-load">
              Floods,
              <br />
              <span>understood.</span>
            </h1>
            <div className="hero-bottom hero-load">
              <p>以高性能模拟理解洪水<br />在变化世界中设计韧性</p>
              <a className="round-link" href="/research/" aria-label="Explore research">
                <span>Explore</span><b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
          <div className="hero-index hero-load" aria-hidden="true">
            <span>VIC-CAS</span><span>CaMa-Flood</span>
            <span>Climate · Risk · Resilience</span>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
