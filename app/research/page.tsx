import { SiteFrame } from "../components/site-frame";
import { research } from "../site-data";

export default function ResearchPage() {
  return (
    <SiteFrame active="research">
      <main className="route-main">
        <header className="visual-page-hero research-visual-hero">
          <div className="visual-hero-image" aria-hidden="true" />
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

      </main>
    </SiteFrame>
  );
}
