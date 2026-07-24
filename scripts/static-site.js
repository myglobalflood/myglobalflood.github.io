(function () {
  const page = document.querySelector(".site-shell");
  const progress = document.querySelector(".scroll-progress");
  const nav = document.querySelector(".site-nav");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#primary-navigation");
  const canvas = document.querySelector(".flow-field");

  function updateScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (progress) progress.style.transform = "scaleX(" + ratio + ")";
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  if (page) {
    window.addEventListener(
      "pointermove",
      function (event) {
        page.style.setProperty("--pointer-x", event.clientX + "px");
        page.style.setProperty("--pointer-y", event.clientY + "px");
        page.style.setProperty(
          "--hero-shift-x",
          (event.clientX / window.innerWidth - 0.5) * -10 + "px",
        );
        page.style.setProperty(
          "--hero-shift-y",
          (event.clientY / window.innerHeight - 0.5) * -8 + "px",
        );
      },
      { passive: true },
    );
  }

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const nextOpen = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", nextOpen);
      menuButton.setAttribute("aria-expanded", String(nextOpen));
      menuButton.setAttribute("aria-label", nextOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach(function (element) {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (element) {
      element.setAttribute("data-visible", "true");
    });
  }

  if (canvas) {
    const context = canvas.getContext("2d");
    if (context) {
      let frame = 0;
      let width = 0;
      let height = 0;
      let pixelRatio = 1;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      function resizeCanvas() {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }

      function drawFlow() {
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
          context.strokeStyle = "rgba(139, 208, 255, " + opacity + ")";
          context.stroke();
        }

        if (!reduceMotion) {
          frame += 1;
          window.requestAnimationFrame(drawFlow);
        }
      }

      resizeCanvas();
      drawFlow();
      window.addEventListener("resize", resizeCanvas);
    }
  }
})();
