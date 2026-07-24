import { SiteFrame } from "../components/site-frame";
import { milestones, publications } from "../site-data";

export default function WorkPage() {
  return (
    <SiteFrame active="work">
      <main className="route-main">
        <header className="page-hero">
          <div className="page-number">03 / 04</div>
          <div>
            <p className="eyebrow">Selected Work</p>
            <h1>Research that<br /><span>moves with water.</span></h1>
          </div>
          <p className="page-intro">
            Selected publications spanning model development, flood attribution,
            monsoon dynamics and precipitation evaluation.
          </p>
        </header>

        <section className="work-page section-pad">
          <div className="publication-list">
            {publications.map((paper, index) => (
              <a
                className="publication"
                data-reveal
                href={paper.href}
                target="_blank"
                rel="noreferrer"
                key={paper.title}
              >
                <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="publication-year">{paper.year}</span>
                <span className="publication-main">
                  <strong>{paper.title}</strong><small>{paper.journal}</small>
                </span>
                <span className="publication-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="milestones section-pad">
          <div className="section-label" data-reveal>
            <span>Momentum</span><span>Selected recognition &amp; projects</span>
          </div>
          <div className="milestone-layout">
            <h2 data-reveal>Science with<br />lasting consequence.</h2>
            <div className="milestone-list">
              {milestones.map((item) => (
                <article data-reveal key={item.title}>
                  <span>{item.date}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
