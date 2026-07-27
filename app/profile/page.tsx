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
                Institute of Hydrology and Water Resources
              </p>
              <p className="profile-bio">
                Dr. Wang studies floods and global change through high-performance
                hydrological–hydrodynamic modelling. His work connects model
                development, process understanding and operational risk monitoring
                across complex river basins.
              </p>
              <div className="profile-meta">
                <div><span>Based at</span><strong>Lanzhou University</strong></div>
                <div><span>Focus</span><strong>Floods · Models · Climate</strong></div>
                <div><span>Education</span><strong>UCAS · Hohai University</strong></div>
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
          <span>Approach</span>
          <p>
            Model the process precisely. Explain the change clearly.
            <em> Turn knowledge into resilience.</em>
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}
