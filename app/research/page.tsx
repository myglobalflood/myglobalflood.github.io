import { SiteFrame } from "../components/site-frame";
import { codeResources, hostedProjects, monitoringSystems, openData } from "../site-data";

export default function ResearchPage() {
  return (
    <SiteFrame active="research">
      <main className="route-main watermark-page">
        <section className="research-hub section-pad">
          <aside className="research-local-nav" aria-label="Research page navigation">
            <a href="#projects"><span>01</span>Projects</a>
            <a href="#open-data"><span>02</span>Data</a>
            <a href="#code"><span>03</span>Code</a>
            <a href="#funding"><span>04</span>Funding</a>
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
              <h2 className="content-section-label" id="data-title">Data</h2>
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

            <section className="research-hub-section" id="code" aria-labelledby="code-title">
              <h2 className="content-section-label" id="code-title">Code</h2>
              <div className="research-card-grid">
                {codeResources.map((resource) => (
                  <article className="system-card resource-card code-card glass-panel" data-reveal key={resource.name}>
                    <span className="system-code">{resource.name}</span>
                    <div>
                      <h3>{resource.title}</h3>
                      <p className="system-title-zh zh-copy" lang="zh-CN">{resource.titleZh}</p>
                      <p>{resource.text}</p>
                      <p className="code-maintainer">{resource.maintainer}</p>
                    </div>
                    <div className="code-links">
                      <a href={resource.href} target="_blank" rel="noreferrer">{resource.linkLabel} <span aria-hidden="true">↗</span></a>
                      <a href={resource.sourceHref} target="_blank" rel="noreferrer">Source code <span aria-hidden="true">↗</span></a>
                    </div>
                  </article>
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
