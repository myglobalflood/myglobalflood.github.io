import { SiteFrame } from "../components/site-frame";
import { withBasePath } from "../site-path";

export default function ProfilePage() {
  return (
    <SiteFrame active="profile">
      <main className="route-main">
        <section className="profile-page section-pad">
          <div className="profile-layout">
            <div className="portrait-wrap" data-reveal>
              <div
                className="portrait"
                style={{ backgroundImage: `linear-gradient(180deg, transparent 55%, rgba(0, 0, 0, 0.38)), url("${withBasePath("/assets/wang-jie.jpg")}")` }}
                role="img"
                aria-label="Portrait of Jie Wang"
              />
              <span className="portrait-code">PI / 01</span>
            </div>
            <div className="profile-copy" data-reveal>
              <p className="eyebrow">Jie Wang · Ph.D.</p>
              <h2>Jie Wang</h2>
              <p className="profile-role">
                Lecturer · Professional Master&apos;s Supervisor<br />
                Institute of Hydrology and Water Resources Engineering
              </p>
              <p className="profile-bio">
                Dr. Wang&apos;s research focuses on floods and global change. He develops
                and applies high-performance hydrological–hydrodynamic models to
                simulate floods, explain their changing drivers and support
                multi-scale monitoring across complex river basins.
              </p>
              <div className="profile-meta">
                <div><span>Appointment</span><strong>Lecturer since June 2022</strong></div>
                <div><span>Affiliation</span><strong>Lanzhou University</strong></div>
                <div><span>Education</span><strong>Ph.D., UCAS · M.Eng. &amp; B.Eng., Hohai University</strong></div>
                <div><span>Office</span><strong>Guanyun Building 1025</strong></div>
              </div>
              <div className="academic-links" aria-label="Academic profiles">
                <a
                  href="https://orcid.org/0000-0003-2520-2920"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>ORCID</span><strong>0000-0003-2520-2920</strong><b aria-hidden="true">↗</b>
                </a>
                <a
                  href="https://scholar.google.com/citations?hl=zh-CN&pli=1&user=jvNCMNgAAAAJ"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Research</span><strong>Google Scholar</strong><b aria-hidden="true">↗</b>
                </a>
                <a
                  href="https://zhysz.lzu.edu.cn/system/zhy/teachInfo.jsp?id=689"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Institution</span><strong>LZU Academic Profile</strong><b aria-hidden="true">↗</b>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-statement section-pad" data-reveal>
          <span>Academic path</span>
          <p>
            Hydrology and water resources at Hohai University.
            <em> Physical geography and flood science at the Chinese Academy of Sciences.</em>
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}
