"use client";

import { useEffect, useRef, useState } from "react";

const research = [
  {
    index: "01",
    title: "High-performance flood modelling",
    cn: "流域高性能洪水模拟与评估",
    text: "Advancing controllable hydrological–hydrodynamic models, including VIC-CAS and CaMa-Flood, for reliable large-basin simulation and assessment.",
  },
  {
    index: "02",
    title: "Flood change & attribution",
    cn: "变化环境下洪水变化与归因",
    text: "Combining observations and models to reveal how climate and environmental change reshape flood components, extremes and future risk.",
  },
  {
    index: "03",
    title: "Multi-scale flood monitoring",
    cn: "复杂水文情势洪水多尺度监测",
    text: "Translating high-performance models into operational monitoring systems—from river floods to rapidly evolving mountain hazards.",
  },
];

const publications = [
  {
    year: "2026",
    title:
      "Multidimensional evaluation of the gridded precipitation datasets over the source region of the Yellow River",
    journal: "Journal of Hydrometeorology · 27(6), 801–821",
    href: "https://journals.ametsoc.org/view/journals/hydr/27/6/JHM-D-26-0019.1.xml",
  },
  {
    year: "2025",
    title:
      "Evolution and Attribution of Flood Volume in the Source Region of the Yellow River",
    journal: "Remote Sensing · 17(8), 1342",
    href: "https://doi.org/10.3390/rs17081342",
  },
  {
    year: "2024",
    title:
      "Impacts of large-scale climatic circulation on floods through precipitation and temperature in the Lancang-Mekong River Basin",
    journal: "Science of the Total Environment · 908, 168082",
    href: "https://doi.org/10.1016/j.scitotenv.2023.168082",
  },
  {
    year: "2022",
    title:
      "Flood inundation in the Lancang-Mekong River Basin: Assessing the role of summer monsoon",
    journal: "Journal of Hydrology · 612, 128075",
    href: "https://doi.org/10.1016/j.jhydrol.2022.128075",
  },
  {
    year: "2021",
    title:
      "Modeling daily floods in the Lancang-Mekong River Basin using an improved hydrological-hydrodynamic model",
    journal: "Water Resources Research · 57(8), e2021WR029734",
    href: "https://doi.org/10.1029/2021WR029734",
  },
];

const milestones = [
  {
    date: "2025",
    title: "Future Star · Innovation Challenge",
    text: "Second Prize, Chinese Meteorological Society",
  },
  {
    date: "2024—26",
    title: "National Natural Science Foundation",
    text: "Flood genesis and future change in the Source Region of the Yellow River",
  },
  {
    date: "2023—26",
    title: "Young Elite Scientist Sponsorship",
    text: "China Association for Science and Technology",
  },
];

function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.6;

      for (let row = 0; row < 15; row += 1) {
        const yBase = height * (0.13 + row * 0.055);
        context.beginPath();

        for (let x = -40; x <= width + 40; x += 8) {
          const normalized = x / Math.max(width, 1);
          const bend =
            Math.sin(normalized * 7.8 + row * 0.66 + frame * 0.003) *
              (14 + row * 0.55) +
            Math.sin(normalized * 2.2 - row * 0.28) * 18;
          const y = yBase + bend;
          if (x === -40) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        const opacity = 0.065 + (row % 4) * 0.012;
        context.strokeStyle = `rgba(139, 208, 255, ${opacity})`;
        context.stroke();
      }

      if (!reduceMotion) {
        frame += 1;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas className="flow-field" ref={canvasRef} aria-hidden="true" />;
}

export function HydroExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
      setScrolled(window.scrollY > 24);
    };

    const handlePointer = (event: PointerEvent) => {
      page.style.setProperty("--pointer-x", `${event.clientX}px`);
      page.style.setProperty("--pointer-y", `${event.clientY}px`);
      page.style.setProperty(
        "--hero-shift-x",
        `${(event.clientX / window.innerWidth - 0.5) * -10}px`,
      );
      page.style.setProperty(
        "--hero-shift-y",
        `${(event.clientY / window.innerHeight - 0.5) * -8}px`,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      observer.observe(element);
    });

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" ref={pageRef}>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="AHS Lab home">
          <span className="brand-mark">AHS</span>
          <span className="brand-name">
            Advanced Hydrological
            <br />
            Simulation
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Primary navigation"
        >
          <a href="#research" onClick={closeMenu}>
            Research
          </a>
          <a href="#profile" onClick={closeMenu}>
            Profile
          </a>
          <a href="#publications" onClick={closeMenu}>
            Work
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <FlowField />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-kicker hero-load">
            <span>36.03° N · 103.83° E</span>
            <span>Lanzhou University</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow hero-load">Floods &amp; Global Change</p>
            <h1 className="hero-load">
              Floods,
              <br />
              <span>understood.</span>
            </h1>
            <div className="hero-bottom hero-load">
              <p>
                以高性能模拟理解洪水
                <br />
                在变化世界中设计韧性
              </p>
              <a className="round-link" href="#research" aria-label="Explore research">
                <span>Explore</span>
                <b aria-hidden="true">↓</b>
              </a>
            </div>
          </div>

          <div className="hero-index hero-load" aria-hidden="true">
            <span>VIC-CAS</span>
            <span>CaMa-Flood</span>
            <span>Climate · Risk · Resilience</span>
          </div>
        </section>

        <section className="statement section-pad">
          <div className="section-label" data-reveal>
            <span>001</span>
            <span>Purpose</span>
          </div>
          <p className="statement-copy" data-reveal>
            From hillslopes to transboundary basins, we develop models that make
            the dynamics of water <em>visible, explainable and actionable.</em>
          </p>
          <p className="statement-cn" data-reveal>
            从坡面到跨境流域，以模型洞察水的变化，让风险可见、可解释、可应对。
          </p>
        </section>

        <section className="research section-pad" id="research">
          <div className="section-heading" data-reveal>
            <div className="section-label">
              <span>002</span>
              <span>Research</span>
            </div>
            <h2>
              Three scales.
              <br />
              One connected system.
            </h2>
          </div>

          <div className="research-list">
            {research.map((item) => (
              <article className="research-item" data-reveal key={item.index}>
                <span className="research-index">{item.index}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="research-cn">{item.cn}</p>
                </div>
                <p className="research-text">{item.text}</p>
                <span className="research-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="image-break" aria-label="Mekong River research landscape">
          <div className="image-break-photo" aria-hidden="true" />
          <div className="image-break-overlay" />
          <div className="image-break-copy" data-reveal>
            <span>Lancang—Mekong Basin</span>
            <h2>
              Observe the system.
              <br />
              Resolve the extremes.
            </h2>
            <p>
              Satellite view: Mekong River near Huay Xai, Laos / NASA Earth
              Observatory, Landsat 8.
            </p>
          </div>
        </section>

        <section className="profile section-pad" id="profile">
          <div className="section-label" data-reveal>
            <span>003</span>
            <span>Principal Investigator</span>
          </div>

          <div className="profile-layout">
            <div className="portrait-wrap" data-reveal>
              <div className="portrait" role="img" aria-label="Portrait of Jie Wang" />
              <span className="portrait-code">PI / 01</span>
            </div>

            <div className="profile-copy" data-reveal>
              <p className="eyebrow">Jie Wang · Ph.D.</p>
              <h2>王杰</h2>
              <p className="profile-role">
                Lecturer · Professional Master&apos;s Supervisor
                <br />
                Institute of Hydrology and Water Resources
              </p>
              <p className="profile-bio">
                Dr. Wang studies floods and global change through high-performance
                hydrological–hydrodynamic modelling. His work connects model
                development, process understanding and operational risk monitoring
                across complex river basins.
              </p>
              <div className="profile-meta">
                <div>
                  <span>Based at</span>
                  <strong>Lanzhou University</strong>
                </div>
                <div>
                  <span>Focus</span>
                  <strong>Floods · Models · Climate</strong>
                </div>
                <div>
                  <span>Education</span>
                  <strong>UCAS · Hohai University</strong>
                </div>
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

        <section className="publications section-pad" id="publications">
          <div className="section-heading" data-reveal>
            <div className="section-label">
              <span>004</span>
              <span>Selected Work</span>
            </div>
            <h2>Research that moves with the water.</h2>
          </div>

          <div className="publication-list">
            {publications.map((paper, index) => (
              <a
                className="publication"
                data-reveal
                href={paper.href}
                target="_blank"
                rel="noreferrer"
                key={paper.title}
              >
                <span className="publication-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="publication-year">{paper.year}</span>
                <span className="publication-main">
                  <strong>{paper.title}</strong>
                  <small>{paper.journal}</small>
                </span>
                <span className="publication-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="milestones section-pad">
          <div className="section-label" data-reveal>
            <span>005</span>
            <span>Momentum</span>
          </div>
          <div className="milestone-layout">
            <h2 data-reveal>
              Science with
              <br />
              lasting consequence.
            </h2>
            <div className="milestone-list">
              {milestones.map((item) => (
                <article data-reveal key={item.title}>
                  <span>{item.date}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-orbit" aria-hidden="true" />
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Join the work</p>
            <h2>
              Let&apos;s understand
              <br />
              what comes next.
            </h2>
            <p>
              We welcome students and collaborators interested in flood modelling,
              hydroclimate extremes and resilient water systems.
            </p>
            <a className="contact-link" href="mailto:jiewang@lzu.edu.cn">
              jiewang@lzu.edu.cn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <span>AHS Lab</span>
          <span>高等水文模拟与应用</span>
        </div>
        <div>
          <span>© 2026 Lanzhou University</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      <div className="cursor-aura" aria-hidden="true" />
    </div>
  );
}
