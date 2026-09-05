import { SiteFrame } from "../components/site-frame";
import { CampusLocation } from "../components/campus-location";

export default function ContactPage() {
  return (
    <SiteFrame active="contact" footer={false}>
      <main className="route-main contact-main">
        <section className="contact">
          <div className="contact-copy glass-panel">
            <p className="eyebrow">Join the work</p>
            <h1>Let&apos;s understand<br /><span>what comes next.</span></h1>
            <p>
              We welcome students and collaborators interested in flood simulation,
              change attribution and multi-scale monitoring.
            </p>
            <a className="contact-link" href="mailto:jiewang@lzu.edu.cn">
              jiewang@lzu.edu.cn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-meta">
            <CampusLocation />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
