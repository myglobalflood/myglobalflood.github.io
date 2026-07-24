import { SiteFrame } from "../components/site-frame";

export default function ContactPage() {
  return (
    <SiteFrame active="contact" footer={false}>
      <main className="route-main contact-main">
        <section className="contact">
          <div className="contact-earth" aria-hidden="true" />
          <div className="contact-coordinate" aria-hidden="true">
            <span>36.03° N</span><span>103.83° E</span>
          </div>
          <div className="contact-copy">
            <p className="eyebrow">Join the work</p>
            <h1>Let&apos;s understand<br /><span>what comes next.</span></h1>
            <p>
              We welcome students and collaborators interested in flood modelling,
              hydroclimate extremes and resilient water systems.
            </p>
            <a className="contact-link" href="mailto:jiewang@lzu.edu.cn">
              jiewang@lzu.edu.cn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-meta">
            <span>Institute of Hydrology &amp; Water Resources</span>
            <span>Lanzhou University · China</span>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
