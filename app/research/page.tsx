import { SiteFrame } from "../components/site-frame";
import { research } from "../site-data";

export default function ResearchPage() {
  return (
    <SiteFrame active="research">
      <main className="route-main">
        <header className="page-hero research-hero">
          <div className="page-number">01 / 04</div>
          <div>
            <p className="eyebrow">Research</p>
            <h1>Three scales.<br /><span>One connected system.</span></h1>
          </div>
          <p className="page-intro">
            From hillslopes to transboundary basins, we develop models that make
            water dynamics visible, explainable and actionable.
          </p>
        </header>

        <section className="research-page section-pad">
          <div className="research-list">
            {research.map((item) => (
              <article className="research-item" data-reveal key={item.index}>
                <span className="research-index">{item.index}</span>
                <div><h2>{item.title}</h2><p className="research-cn">{item.cn}</p></div>
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

        <section className="image-break" aria-label="Mekong River research landscape">
          <div className="image-break-photo" aria-hidden="true" />
          <div className="image-break-overlay" />
          <div className="image-break-copy" data-reveal>
            <span>Lancang–Mekong Basin</span>
            <h2>Observe the system.<br />Resolve the extremes.</h2>
            <p>
              Satellite view: Mekong River near Huay Xai, Laos / NASA Earth
              Observatory, Landsat 8.
            </p>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
