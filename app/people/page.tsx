import { SiteFrame } from "../components/site-frame";
import { withBasePath } from "../site-path";

const profileLinks = [
  { label: "ORCID", value: "0000-0003-2520-2920", href: "https://orcid.org/0000-0003-2520-2920" },
  { label: "Google Scholar", value: "Publication profile", href: "https://scholar.google.com/citations?hl=zh-CN&pli=1&user=jvNCMNgAAAAJ" },
  { label: "Lanzhou University", value: "Academic profile", href: "https://zhysz.lzu.edu.cn/system/zhy/teachInfo.jsp?id=689" },
];

export default function PeoplePage() {
  return (
    <SiteFrame active="people">
      <main className="route-main people-page">
        <header className="people-intro section-pad">
          <p className="eyebrow">People</p>
          <h1>Working across scales,<br /><span>learning across disciplines.</span></h1>
        </header>

        <section className="people-group section-pad" aria-labelledby="faculty-title">
          <div className="people-group-heading" data-reveal>
            <span>01</span><h2 id="faculty-title">Faculty</h2>
          </div>
          <article className="faculty-card" data-reveal>
            <div className="portrait-wrap">
              <div
                className="portrait"
                style={{ backgroundImage: `linear-gradient(180deg, transparent 55%, rgba(0, 66, 92, 0.28)), url("${withBasePath("/assets/wang-jie.jpg")}")` }}
                role="img"
                aria-label="Portrait of Jie Wang"
              />
              <span className="portrait-code">PI / 01</span>
            </div>
            <div className="faculty-copy">
              <p className="eyebrow">Jie Wang · Ph.D.</p>
              <h2>Jie Wang</h2>
              <p className="profile-role">
                Lecturer · Professional Master&apos;s Supervisor<br />
                Institute of Hydrology and Water Resources Engineering
              </p>
              <p className="profile-bio">
                Dr. Wang studies floods and global change. His work connects
                high-performance hydrological–hydrodynamic modelling, flood
                attribution and multi-scale monitoring to understand changing
                flood regimes across complex river basins.
              </p>
              <dl className="profile-meta">
                <div><dt>Appointment</dt><dd>Lecturer since June 2022</dd></div>
                <div><dt>Affiliation</dt><dd>Lanzhou University</dd></div>
                <div><dt>Education</dt><dd>Ph.D., UCAS · M.Eng. &amp; B.Eng., Hohai University</dd></div>
                <div><dt>Office</dt><dd>Guanyun Building 1025</dd></div>
              </dl>
              <div className="academic-links" aria-label="Academic profiles">
                {profileLinks.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                    <span>{link.label}</span><strong>{link.value}</strong><b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="people-group student-group section-pad" aria-labelledby="students-title">
          <div className="people-group-heading" data-reveal>
            <span>02</span><h2 id="students-title">Graduate Students</h2>
          </div>
          <p className="empty-roster" data-reveal>
            Student profiles will be added after the group roster is confirmed.
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}
