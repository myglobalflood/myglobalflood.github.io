import { SiteFrame } from "../components/site-frame";
import { hostedProjects, monitoringSystems, openData } from "../site-data";
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

        <section className="research-hub section-pad">
          <aside className="research-local-nav" aria-label="Research page navigation">
            <a href="#projects"><span>01</span>Projects</a>
            <a href="#open-data"><span>02</span>Open Data</a>
            <a href="#funding"><span>03</span>Funding</a>
          </aside>

          <div className="research-hub-content">
            <section className="research-hub-section" id="projects" aria-labelledby="projects-title">
              <h2 className="content-section-label" id="projects-title">Projects · Operational Systems</h2>
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
                      <p className="system-title-zh" lang="zh-CN">{system.titleZh}</p>
                      <p>{system.text}</p>
                    </div>
                    <span className="system-action">Open system ↗</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="research-hub-section" id="open-data" aria-labelledby="data-title">
              <h2 className="content-section-label" id="data-title">Open Data</h2>
              <div className="research-card-grid">
                {openData.map((dataset) => (
                  <a
                    className="system-card resource-card"
                    data-reveal
                    href={dataset.href}
                    target="_blank"
                    rel="noreferrer"
                    key={dataset.doi}
                  >
                    <span className="system-code">{dataset.year} · {dataset.repository}</span>
                    <div><h3>{dataset.title}</h3><p>{dataset.text}</p></div>
                    <span className="system-action">DOI {dataset.doi} ↗</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="research-hub-section" id="funding" aria-labelledby="funding-title">
              <h2 className="content-section-label" id="funding-title">Funding · Principal Investigator</h2>
              <div className="research-card-grid funding-grid">
                {hostedProjects.map((item) => (
                  <article className="system-card resource-card project-card" data-reveal key={item.title}>
                    <span className="system-code">{item.period}</span>
                    <div className="project-card-copy">
                      <p className="project-sponsor">{item.sponsor}</p>
                      <p className="project-sponsor-zh" lang="zh-CN">{item.sponsorZh}</p>
                      <h3>{item.title}</h3>
                      <p className="system-title-zh" lang="zh-CN">{item.titleZh}</p>
                    </div>
                    <div className="project-meta">
                      <span>{item.meta}</span>
                      <span lang="zh-CN">{item.metaZh}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

      </main>
    </SiteFrame>
  );
}
