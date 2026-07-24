import { SiteFrame } from "../components/site-frame";

export default function ProfilePage() {
  return (
    <SiteFrame active="profile">
      <main className="route-main">
        <header className="page-hero compact-hero">
          <div className="page-number">02 / 04</div>
          <div>
            <p className="eyebrow">Principal Investigator</p>
            <h1>Jie Wang<br /><span>王杰</span></h1>
          </div>
          <p className="page-intro">
            High-performance hydrological modelling for a changing world.
          </p>
        </header>

        <section className="profile-page section-pad">
          <div className="profile-layout">
            <div className="portrait-wrap" data-reveal>
              <div className="portrait" role="img" aria-label="Portrait of Jie Wang" />
              <span className="portrait-code">PI / 01</span>
            </div>
            <div className="profile-copy" data-reveal>
              <p className="eyebrow">Jie Wang · Ph.D.</p>
              <h2>王杰</h2>
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
              <a
                className="text-link"
                href="https://zhysz.lzu.edu.cn/system/zhy/teachInfo.jsp?id=689"
                target="_blank"
                rel="noreferrer"
              >
                Full academic profile <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="profile-statement section-pad" data-reveal>
          <span>Approach / 方法</span>
          <p>
            Model the process precisely. Explain the change clearly.
            <em> Turn knowledge into resilience.</em>
          </p>
        </section>
      </main>
    </SiteFrame>
  );
}
