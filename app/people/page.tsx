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
        <section className="people-hub section-pad">
          <aside className="research-local-nav people-local-nav" aria-label="People page navigation">
            <a href="#pi"><span>01</span>PI</a>
            <a href="#members"><span>02</span>Current Members</a>
            <a href="#alumni"><span>03</span>Alumni</a>
          </aside>

          <div className="people-hub-content">
            <section className="people-hub-section" id="pi" aria-labelledby="faculty-title">
              <article className="faculty-card" data-reveal>
                <div className="faculty-copy faculty-intro">
                  <p className="eyebrow">People · Principal Investigator</p>
                  <h1 id="faculty-title">Jie Wang <span className="zh-copy" lang="zh-CN">王杰</span></h1>
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
                </div>
                <div className="portrait-wrap">
                  <div
                    className="portrait"
                    style={{ backgroundImage: `linear-gradient(180deg, transparent 55%, rgba(0, 66, 92, 0.28)), url("${withBasePath("/assets/wang-jie.jpg")}")` }}
                    role="img"
                    aria-label="Portrait of Jie Wang"
                  />
                  <span className="portrait-code">PI / 01</span>
                </div>
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
              </article>
            </section>

            <section className="people-hub-section" id="members" aria-labelledby="members-title">
              <div className="people-section-heading" data-reveal>
                <p className="eyebrow">Current Members</p>
                <h2 id="members-title">Graduate students and group members.</h2>
              </div>
              <div className="member-grid">
                {["01", "02", "03"].map((slot) => (
                  <article className="member-card" data-reveal key={slot}>
                    <span>{slot}</span><h3>Name to be added</h3><p>Graduate student profile</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="people-hub-section" id="alumni" aria-labelledby="alumni-title">
              <div className="people-section-heading" data-reveal>
                <p className="eyebrow">Alumni</p>
                <h2 id="alumni-title">Former graduate students.</h2>
              </div>
              <div className="member-grid">
                {["01", "02", "03"].map((slot) => (
                  <article className="member-card" data-reveal key={slot}>
                    <span>{slot}</span><h3>Name to be added</h3><p>Alumni profile</p>
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
