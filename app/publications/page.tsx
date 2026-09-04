import { SiteFrame } from "../components/site-frame";
import { books, intellectualProperty, publications } from "../site-data";
import { withBasePath } from "../site-path";

function PublicationContent({
  paper,
  index,
}: {
  paper: (typeof publications)[number];
  index: number;
}) {
  return (
    <>
      <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="publication-year">{paper.year}</span>
      <span className="publication-main">
        <strong>{paper.title}</strong>
        {"titleZh" in paper && paper.titleZh ? <em lang="zh-CN">{paper.titleZh}</em> : null}
        <small>
          {paper.journal}
          {"journalZh" in paper && paper.journalZh ? <span lang="zh-CN"> · {paper.journalZh}</span> : null}
        </small>
      </span>
      {"href" in paper && paper.href ? <span className="publication-arrow" aria-hidden="true">↗</span> : <span />}
    </>
  );
}

export default function PublicationsPage() {
  const sortedPublications = [...publications].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <SiteFrame active="publications">
      <main className="route-main">
        <header className="visual-page-hero work-visual-hero">
          <div
            className="visual-hero-image"
            style={{ backgroundImage: `url("${withBasePath("/assets/work-water.webp")}")` }}
            aria-hidden="true"
          />
          <div className="visual-hero-shade" aria-hidden="true" />
          <div className="visual-hero-copy">
            <p className="eyebrow">Publication · 2014–2026</p>
            <h1>Research that<br /><span>moves with water.</span></h1>
            <p className="visual-hero-intro">
              Peer-reviewed papers, scholarly book chapters and registered
              software supporting flood science and basin intelligence.
            </p>
          </div>
          <p className="visual-hero-credit">
            Ili River Delta · NASA Earth Observatory · Landsat 8
          </p>
        </header>

        <section className="publication-hub section-pad">
          <aside className="research-local-nav publication-local-nav" aria-label="Publication page navigation">
            <a href="#papers"><span>01</span>Papers</a>
            <a href="#books"><span>02</span>Books</a>
            <a href="#intellectual-property"><span>03</span>Intellectual Property</a>
          </aside>

          <div className="publication-hub-content">
            <section className="publication-hub-section" id="papers" aria-labelledby="papers-title">
              <div className="publication-section-heading" data-reveal>
                <p className="eyebrow">Papers</p>
                <h2 id="papers-title">Peer-reviewed<br />research record.</h2>
                <p>Studies of flood processes, climate drivers and water risks across scales.</p>
              </div>
              <div className="publication-list">
                {sortedPublications.map((paper, index) => (
                  "href" in paper && paper.href ? (
                    <a
                      className="publication"
                      data-reveal
                      href={paper.href}
                      target="_blank"
                      rel="noreferrer"
                      key={`${paper.year}-${paper.title}`}
                    >
                      <PublicationContent paper={paper} index={index} />
                    </a>
                  ) : (
                    <article className="publication" data-reveal key={`${paper.year}-${paper.title}`}>
                      <PublicationContent paper={paper} index={index} />
                    </article>
                  )
                ))}
              </div>
              <a
                className="work-profile-link"
                href="https://scholar.google.com/citations?hl=zh-CN&pli=1&user=jvNCMNgAAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Explore the complete publication record on Google Scholar
                <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section className="publication-hub-section" id="books" aria-labelledby="books-title">
              <div className="publication-section-heading" data-reveal>
                <p className="eyebrow">Books · Scholarly Chapters</p>
                <h2 id="books-title">Long-form work<br />on water hazards.</h2>
              </div>
              <div className="knowledge-grid">
                {books.map((book) => (
                  <article className="knowledge-card" data-reveal key={book.title}>
                    <span className="system-code">{book.year}</span>
                    <h3>{book.title}</h3>
                    <p>{book.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="publication-hub-section" id="intellectual-property" aria-labelledby="ip-title">
              <div className="publication-section-heading" data-reveal>
                <p className="eyebrow">Intellectual Property · Software Copyrights</p>
                <h2 id="ip-title">Research translated<br />into working systems.</h2>
                <p>Software systems for hydrological modelling, flood detection, forecasting and risk assessment.</p>
              </div>
              <div className="knowledge-grid">
                {intellectualProperty.map((item) => (
                  <article className="knowledge-card ip-card" data-reveal key={item.registration}>
                    <span className="system-code">{item.year} · {item.registration}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="knowledge-title-zh" lang="zh-CN">{item.titleZh}</p>
                    </div>
                    <p className="knowledge-meta">{item.authors}</p>
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
