import { SiteFrame } from "./components/site-frame";
import { CampusLocation } from "./components/campus-location";
import { withBasePath } from "./site-path";

export default function Home() {
  return (
    <SiteFrame active="home" home flow>
      <main className="home-main">
        <section className="hero">
          <div
            className="hero-image"
            style={{ backgroundImage: `url("${withBasePath("/assets/flood-hero-village-enhanced.png")}")` }}
            aria-hidden="true"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="hero-copy-center">
              <p className="eyebrow hero-load">Floods, understood.</p>
              <h1 className="hero-load">Flood &amp; Global Change Group</h1>
              <a className="hero-cta hero-load" href={withBasePath("/research/")}>
                <span>View research</span>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
          <div className="hero-index hero-load">
            <CampusLocation />
            <span className="hero-theme-tags">Flood · Climate · Resilience</span>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
