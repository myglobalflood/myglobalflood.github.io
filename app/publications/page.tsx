import { SiteFrame } from "../components/site-frame";
import { books, intellectualProperty, publications } from "../site-data";

type PublicationEntry = {
  year: string;
  title: string;
  titleZh?: string;
  authors: string;
  authorsZh?: string;
  journal: string;
  journalZh?: string;
  href?: string;
};

function PublicationContent({ paper }: { paper: PublicationEntry }) {
  return (
    <>
      <time className="publication-year" dateTime={paper.year}>{paper.year}</time>
      <span className="publication-main">
        <strong>{paper.title}</strong>
        {paper.titleZh ? <em className="zh-copy" lang="zh-CN">{paper.titleZh}</em> : null}
        <span className="publication-authors">
          {paper.authors}
          {paper.authorsZh ? <><br /><span className="zh-copy" lang="zh-CN">{paper.authorsZh}</span></> : null}
        </span>
        <small>
          {paper.journal}
          {paper.journalZh ? <span className="zh-copy" lang="zh-CN"> · {paper.journalZh}</span> : null}
        </small>
      </span>
      {paper.href ? <span className="publication-arrow" aria-hidden="true">↗</span> : <span />}
    </>
  );
}

function PublicationList({ entries }: { entries: PublicationEntry[] }) {
  return (
    <div className="publication-list">
      {entries.map((entry) => entry.href ? (
        <a className="publication" data-reveal href={entry.href} target="_blank" rel="noreferrer" key={`${entry.year}-${entry.title}`}>
          <PublicationContent paper={entry} />
        </a>
      ) : (
        <article className="publication" data-reveal key={`${entry.year}-${entry.title}`}>
          <PublicationContent paper={entry} />
        </article>
      ))}
    </div>
  );
}

export default function PublicationsPage() {
  const sortedPublications = [...publications].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <SiteFrame active="publications">
      <main className="route-main watermark-page">
        <section className="publication-hub section-pad">
          <aside className="research-local-nav publication-local-nav" aria-label="Publication page navigation">
            <a href="#papers"><span>01</span>Papers</a>
            <a href="#books"><span>02</span>Books</a>
            <a href="#intellectual-property"><span>03</span>Intellectual Property</a>
          </aside>

          <div className="publication-hub-content">
            <section className="publication-hub-section" id="papers" aria-labelledby="papers-title">
              <h2 className="content-section-label" id="papers-title">Papers</h2>
              <PublicationList entries={sortedPublications} />
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
              <PublicationList entries={books.map((book) => ({ ...book, journal: book.text }))} />
            </section>

            <section className="publication-hub-section" id="intellectual-property" aria-labelledby="ip-title">
              <h2 className="content-section-label" id="ip-title">Intellectual Property · Software Copyrights</h2>
              <PublicationList entries={intellectualProperty.map((item) => ({
                ...item,
                authors: item.authors.split(" / ")[0],
                authorsZh: item.authors.split(" / ")[1],
                journal: item.registration,
              }))} />
            </section>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
