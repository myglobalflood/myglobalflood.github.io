"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { withBasePath } from "../site-path";

type RouteName = "home" | "research" | "people" | "publications" | "contact";

const navItems: Array<{ key: RouteName; label: string; href: string }> = [
  { key: "research", label: "Research", href: "/research/" },
  { key: "people", label: "People", href: "/people/" },
  { key: "publications", label: "Publications", href: "/publications/" },
  { key: "contact", label: "Contact", href: "/contact/" },
];

function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
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
        context.strokeStyle = `rgba(139, 208, 255, ${0.065 + (row % 4) * 0.012})`;
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

export function SiteFrame({
  active,
  children,
  home = false,
  flow = false,
  footer = true,
}: {
  active: RouteName;
  children: ReactNode;
  home?: boolean;
  flow?: boolean;
  footer?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const onScroll = () => setScrolled(window.scrollY > 20);
    const onPointer = (event: PointerEvent) => {
      shell.style.setProperty("--pointer-x", `${event.clientX}px`);
      shell.style.setProperty("--pointer-y", `${event.clientY}px`);
      shell.style.setProperty("--hero-shift-x", `${(event.clientX / window.innerWidth - 0.5) * -10}px`);
      shell.style.setProperty("--hero-shift-y", `${(event.clientY / window.innerHeight - 0.5) * -8}px`);
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
      { threshold: 0.1 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className={`site-shell ${home ? "is-home" : "is-interior"}`} ref={shellRef}>
      <header className={`site-nav ${scrolled || !home ? "is-scrolled" : ""}`}>
        <a className="brand" href={withBasePath("/")} aria-label="Flood and Global Change Group home">
          <span className="brand-mark">
            <img src={withBasePath("/assets/flood-global-change-logo.jpg")} alt="" />
          </span>
          <span className="brand-name">Flood &amp; Global<br />Change Group</span>
        </a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav
          id="primary-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              className={active === item.key ? "is-active" : ""}
              href={withBasePath(item.href)}
              onClick={() => setMenuOpen(false)}
              key={item.key}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {flow && <FlowField />}
      {children}

      {!home && footer && (
        <footer>
          <div><span>Flood &amp; Global Change Group</span><span>Flood science · Climate · Resilience</span></div>
          <div><span>© 2026 Lanzhou University</span><a href={withBasePath("/")}>Home ↗</a></div>
        </footer>
      )}
      <div className="cursor-aura" aria-hidden="true" />
    </div>
  );
}
