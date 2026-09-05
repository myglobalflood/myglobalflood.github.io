import { SiteFrame } from "../components/site-frame";
import { hostedProjects, monitoringSystems, openData } from "../site-data";
import { withBasePath } from "../site-path";

export default function ResearchPage() {
  return (
    <SiteFrame active="research">
      <main className="route-main watermark-page">
        <div
          className="page-watermark research-page-watermark"
          style={{ backgroundImage: `url("${withBasePath("/assets/mekong-satellite.webp")}")` }}
          aria-hidden="true"
        />

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
                    className="system-card glass-panel"
                    data-reveal
                    href={system.href}
                    target="_blank"
                    rel="noreferrer"
                    key={system.code}
                  >
                    <span className="system-code">{system.code}</span>
                    <div>
                      <h3>{system.title}</h3>
                      <p className="system-title-zh zh-copy" lang="zh-CN">{system.titleZh}</p>
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
                    className="system-card resource-card glass-panel"
                    data-reveal
                    href={dataset.href}
                    target="_blank"
                    rel="noreferrer"
                    key={dataset.doi}
                  >
                    <span className="system-code">{dataset.year} · {dataset.repository}</span>
                    <div>
                      <h3>{dataset.title}</h3>
                      <p className="system-title-zh zh-copy" lang="zh-CN">{dataset.titleZh}</p>
                      <p>{dataset.text}</p>
                    </div>
                    <span className="system-action">DOI {dataset.doi} ↗</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="research-hub-section" id="funding" aria-labelledby="funding-title">
              <h2 className="content-section-label" id="funding-title">Funding · Principal Investigator</h2>
              <div className="research-card-grid funding-grid">
                {hostedProjects.map((item) => (
                  <article className="system-card resource-card project-card glass-panel" data-reveal key={item.title}>
                    <span className="system-code">{item.period}</span>
                    <div className="project-card-copy">
                      <p className="project-sponsor">{item.sponsor}</p>
                      <p className="project-sponsor-zh zh-copy" lang="zh-CN">{item.sponsorZh}</p>
                      <h3>{item.title}</h3>
                      <p className="system-title-zh zh-copy" lang="zh-CN">{item.titleZh}</p>
                    </div>
                    <div className="project-meta">
                      <span>{item.meta}</span>
                      <span className="zh-copy" lang="zh-CN">{item.metaZh}</span>
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
