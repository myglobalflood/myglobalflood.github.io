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
      <main className="route-main watermark-page">
        <div
          className="page-watermark publication-page-watermark"
          style={{ backgroundImage: `url("${withBasePath("/assets/work-water.webp")}")` }}
          aria-hidden="true"
        />

        <section className="publication-hub section-pad">
          <aside className="research-local-nav publication-local-nav" aria-label="Publication page navigation">
            <a href="#papers"><span>01</span>Papers</a>
            <a href="#books"><span>02</span>Books</a>
            <a href="#intellectual-property"><span>03</span>Intellectual Property</a>
          </aside>

          <div className="publication-hub-content">
            <section className="publication-hub-section" id="papers" aria-labelledby="papers-title">
              <h2 className="content-section-label" id="papers-title">Papers</h2>
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
              <h2 className="content-section-label" id="books-title">Books · Scholarly Chapters</h2>
              <div className="publication-list">
                {books.map((book, index) => (
                  <article className="publication" data-reveal key={book.title}>
                    <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="publication-year">{book.year}</span>
                    <span className="publication-main">
                      <strong>{book.title}</strong>
                      <small>{book.text}</small>
                    </span>
                    <span />
                  </article>
                ))}
              </div>
            </section>

            <section className="publication-hub-section" id="intellectual-property" aria-labelledby="ip-title">
              <h2 className="content-section-label" id="ip-title">Intellectual Property · Software Copyrights</h2>
              <div className="publication-list">
                {intellectualProperty.map((item, index) => (
                  <article className="publication" data-reveal key={item.registration}>
                    <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="publication-year">{item.year}</span>
                    <span className="publication-main">
                      <strong>{item.title}</strong>
                      <em lang="zh-CN">{item.titleZh}</em>
                      <small>
                        {item.registration} · {item.authors.split(" / ")[0]}
                        {item.authors.includes(" / ") ? (
                          <span lang="zh-CN"> / {item.authors.split(" / ")[1]}</span>
                        ) : null}
                      </small>
                    </span>
                    <span />
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
