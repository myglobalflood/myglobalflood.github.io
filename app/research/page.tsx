import { SiteFrame } from "../components/site-frame";
import { monitoringSystems, research } from "../site-data";
import { withBasePath } from "../site-path";

export default function ResearchPage() {
  return (
    <SiteFrame active="research">
      <main className="route-main">
        <header className="visual-page-hero research-visual-hero">
          <div
            className="visual-hero-image"
            style={{ backgroundImage: `url("${withBasePath("/assets/mekong-satellite.webp")}")` }}
            aria-hidden="true"
          />
          <div className="visual-hero-shade" aria-hidden="true" />
          <div className="visual-hero-copy">
            <p className="eyebrow">Research · Basin Intelligence</p>
            <h1>One system.<br /><span>Three scales.</span></h1>
            <p className="visual-hero-intro">
              From hillslopes to transboundary basins, we develop models that
              make water dynamics visible, explainable and actionable.
            </p>
          </div>
          <p className="visual-hero-credit">
            Mekong River near Huay Xai · NASA Earth Observatory · Landsat 8
          </p>
        </header>

        <section className="research-page section-pad">
          <div className="research-list">
            {research.map((item) => (
              <article className="research-item" data-reveal key={item.index}>
                <span className="research-index">{item.index}</span>
                <div><h2>{item.title}</h2></div>
                <div className="research-detail">
                  <p>{item.text}</p>
                  <div className="tag-list">
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <span className="research-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="systems-section section-pad" aria-labelledby="systems-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Operational Systems</p>
            <h2 id="systems-title">From flood science<br />to basin intelligence.</h2>
            <p>
              Research models are translated into monitoring services for complex,
              transboundary river basins.
            </p>
          </div>
          <div className="system-grid">
            {monitoringSystems.map((system) => (
              <a
                className="system-card"
                data-reveal
                href={system.href}
                target="_blank"
                rel="noreferrer"
                key={system.code}
              >
                <span className="system-code">{system.code}</span>
                <div>
                  <h3>{system.title}</h3>
                  <p className="system-title-zh">{system.titleZh}</p>
                  <p>{system.text}</p>
                </div>
                <span className="system-action">Open system ↗</span>
              </a>
            ))}
          </div>
        </section>

      </main>
    </SiteFrame>
  );
}
