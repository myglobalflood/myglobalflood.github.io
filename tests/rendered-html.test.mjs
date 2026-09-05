import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Flood and Global Change Group home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Flood &amp; Global Change Group/);
  assert.match(html, /Floods, understood\./);
  assert.match(html, /flood-hero-village-enhanced\.png/);
  assert.doesNotMatch(html, /AI-enhanced photograph/);
  assert.match(html, /Flood · Climate · Resilience/);
  assert.doesNotMatch(html, /flood-hero-pakistan|flood-hero-minnesota|Pakistan Floods|Pano Aqil|Wayne Gray|DVIDS|Public Domain|Andrea Booher/);
  assert.doesNotMatch(html, /hero-brand-card/);
  assert.doesNotMatch(html, /AHS Lab|Advanced Hydrological Simulation/);
});

test("keeps the shared navigation geometry stable between short and scrolling routes", async () => {
  const [css, siteFrame] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-frame.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(css, /html\s*\{[^}]*overflow-y:\s*scroll;[^}]*scrollbar-gutter:\s*stable;/s);
  assert.match(css, /\.site-nav\s*\{[^}]*height:\s*var\(--nav-height\);[^}]*padding:\s*0 var\(--page-pad\);[^}]*border-bottom:\s*1px solid transparent;/s);
  assert.match(css, /\.site-nav \.nav-actions\s*\{\s*justify-self:\s*end;/s);
  assert.doesNotMatch(css, /\.site-nav\.is-scrolled\s*\{[^}]*padding-(?:top|bottom):/s);
  assert.ok(siteFrame.indexOf("<nav") < siteFrame.indexOf('<div className="nav-actions">'));
});

test("offers a persistent, fully adapted light theme", async () => {
  const [css, layout, siteFrame] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-frame.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /data-theme="light" suppressHydrationWarning/);
  assert.match(layout, /localStorage\.getItem\("fgcg-theme"\)/);
  assert.match(siteFrame, /const THEME_STORAGE_KEY = "fgcg-theme";/);
  assert.match(siteFrame, /className="theme-toggle"/);
  assert.match(siteFrame, /Switch to light mode/);
  assert.match(siteFrame, /window\.localStorage\.setItem\(THEME_STORAGE_KEY, nextTheme\)/);
  assert.match(css, /Persistent light theme[\s\S]*html\[data-theme="light"\] \.is-home \.hero-image\s*\{[^}]*filter:/s);
  assert.match(css, /html\[data-theme="light"\] \.is-interior\s*\{[^}]*--glass-surface:\s*linear-gradient/s);
  assert.match(css, /html\[data-theme="light"\] \.is-interior \.contact-earth\s*\{[^}]*filter:/s);
  assert.match(css, /html\[data-theme="light"\] \.is-home \.hero-copy-center::before\s*\{\s*content:\s*none;/s);
  assert.match(css, /html\[data-theme="light"\] \.is-home \.hero h1\s*\{[^}]*text-shadow:\s*none;/s);
  assert.match(css, /html\[data-theme="light"\] \.is-home \.hero \.eyebrow\s*\{[^}]*color:\s*#55d2e9;[^}]*text-shadow:\s*0 1px 1px rgba\(0, 22, 31, 0\.9\);/s);
  assert.match(css, /html\[data-theme="light"\] \.is-home \.site-nav\.is-scrolled\s*\{[^}]*background:\s*transparent;[^}]*backdrop-filter:\s*none;/s);
  assert.match(css, /html\[data-theme="light"\] \.is-home \.hero-image\s*\{[^}]*filter:\s*saturate\(var\(--photo-saturation\)\) contrast\(0?\.98\) brightness\(1\) blur\(var\(--hero-soften\)\);/s);
  assert.match(css, /\.hero-image\s*\{[^}]*--hero-soften:\s*clamp\(0\.2px, 0\.025vw, 0\.55px\);[^}]*filter:\s*saturate\(var\(--photo-saturation\)\) contrast\(0?\.92\) brightness\(0?\.88\) blur\(var\(--hero-soften\)\);/s);
  assert.doesNotMatch(css, /\.hero(?:\s+\.hero-copy(?:-center)?|\s+h1)?\s*\{[^}]*filter:\s*blur\(/s);
});

test("defaults to light before paint while honoring an explicit saved dark preference", async () => {
  const [layout, siteFrame] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-frame.tsx", import.meta.url), "utf8"),
  ]);
  const bootScript = layout.match(/const themeBootScript = `([^`]+)`;/)[1];
  for (const [saved, expected] of [[null, "light"], ["light", "light"], ["dark", "dark"], ["invalid", "light"], ["blocked", "light"]]) {
    const document = { documentElement: { dataset: {}, style: {} } };
    runInNewContext(bootScript, {
      document,
      localStorage: { getItem() { if (saved === "blocked") throw new Error("Storage unavailable"); return saved; } },
    });
    assert.equal(document.documentElement.dataset.theme, expected);
    assert.equal(document.documentElement.style.colorScheme, expected);
  }
  assert.match(siteFrame, /useState<ThemeMode>\("light"\)/);
  assert.match(siteFrame, /savedTheme === "dark" \? "dark" : "light"/);
});

test("keeps the research and publication artwork visible and fixed behind scrolling content", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\.watermark-page\s*\{[^}]*overflow:\s*clip;[^}]*animation:\s*watermark-page-fade/s);
  assert.match(css, /\.page-watermark\s*\{[^}]*position:\s*fixed;/s);
  assert.match(css, /\.research-local-nav\s*\{[^}]*position:\s*sticky;[^}]*top:\s*calc\(var\(--nav-height\) \+ 2rem\);/s);
  assert.match(css, /Unified dark interior theme[\s\S]*\.is-interior \.page-watermark\s*\{[^}]*opacity:\s*0\.37;/s);
});

test("uses a unified dark interior palette and compact section rhythm", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /Unified dark interior theme[\s\S]*\.is-interior \.route-main\s*\{\s*background:\s*#102831;/s);
  assert.match(css, /\.is-interior \.site-nav,[\s\S]*background:\s*rgba\(7, 22, 29, 0\.88\);/s);
  assert.match(css, /\.research-hub-section,[\s\S]*\.publication-hub-section\s*\{[^}]*padding-bottom:\s*clamp\(2rem, 3vw, 3rem\);/s);
  assert.match(css, /\.is-interior \.people-page\s*\{[^}]*linear-gradient\(180deg, #12303a 0%, #0e252e 62%, #0a1e26 100%\)/s);
  assert.match(css, /--glass-surface:\s*linear-gradient\(145deg, rgba\(16, 45, 55, 0\.62\), rgba\(8, 29, 37, 0\.44\)\);/s);
  assert.match(css, /\.is-interior \.glass-panel\s*\{[^}]*background:\s*var\(--glass-surface\);[^}]*backdrop-filter:\s*blur\(var\(--glass-blur\)\) saturate\(122%\);/s);
  assert.match(css, /--accent-mint:\s*#91cfc4;[\s\S]*--accent-warm:\s*#e1b36e;/s);
  assert.doesNotMatch(css, /\.is-interior #(open-data|funding|books|intellectual-property) \.content-section-label/);
  assert.doesNotMatch(css, /\.is-interior #(members|alumni) \.eyebrow/);
});

test("keeps page navigation unfilled with comfortable narrow-screen spacing", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  for (const pathname of ["/people/", "/research/", "/publications/"]) {
    const html = await (await render(pathname)).text();
    assert.match(html, /<aside class="research-local-nav/);
    assert.doesNotMatch(html, /<aside class="research-local-nav[^\"]*glass-panel"/);
  }
  assert.match(css, /\.research-local-nav\s*\{[^}]*padding:\s*1\.1rem 0;[^}]*background:\s*transparent;/s);
  assert.match(css, /\.research-local-nav a\s*\{[^}]*padding:\s*0\.8rem 0;/s);
  assert.match(css, /\.research-local-nav\s*\{[^}]*overflow-x:\s*auto;[^}]*padding:\s*0\.65rem 0\.8rem;/s);
  assert.doesNotMatch(css, /\.research-local-nav\s*\{[^}]*margin-(?:left|right):\s*calc\(var\(--page-pad\) \* -1\)/s);
});

test("protects light-home text contrast without heavy multi-layer fog", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const scrim = css.match(/html\[data-theme="light"\] \.is-home \.hero-shade\s*\{([^}]+)\}/s)[1];
  const stops = [...scrim.matchAll(/rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/g)]
    .map((match) => match.slice(1).map(Number));
  assert.equal((scrim.match(/linear-gradient\(/g) || []).length, 1);
  assert.doesNotMatch(scrim, /radial-gradient|blur\(/);
  const luminance = (rgb) => rgb.map((channel) => channel / 255)
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  for (const [red, green, blue, alpha] of stops) {
    assert.ok(alpha <= 0.56, "Keep the reduced light-home scrim; do not restore heavy fog");
    const shadow = luminance([red * alpha, green * alpha, blue * alpha]);
    assert.ok((shadow + 0.05) / (luminance([0, 9, 13]) + 0.05) >= 4.5, "Navigation and actions must remain readable even over black image pixels");
    assert.ok((shadow + 0.05) / (luminance([8, 35, 43]) + 0.05) >= 3, "Large title must retain sufficient contrast");
  }
  assert.match(css, /\.is-home \.hero \.eyebrow\s*\{\s*color:\s*#55d2e9;/s);
  assert.match(css, /\.is-home \.site-nav nav a\s*\{\s*color:\s*#00090d;/s);
});

test("retains natural photograph colors consistently across both themes", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.site-shell\s*\{[^}]*--photo-saturation:\s*0\.9;/s);
  const photoRules = [...css.matchAll(/([^{}]+)\{([^{}]*filter:\s*saturate\(var\(--photo-saturation\)\)[^{}]*)\}/g)];
  assert.equal(photoRules.length, 8, "Home, shared interior, People and Contact must share color retention in both themes");
  for (const [_, selector, body] of photoRules) {
    assert.match(selector, /\.(hero-image|page-watermark|people-page-watermark|contact-earth)\s*$/);
    assert.doesNotMatch(body, /grayscale|sepia|hue-rotate/, "Do not replace the source photograph's hues");
  }
  const lightScrim = css.match(/html\[data-theme="light"\] \.is-home \.hero-shade\s*\{([^}]+)\}/s)[1];
  for (const stop of lightScrim.matchAll(/rgba\((\d+), (\d+), (\d+),/g)) {
    const channels = stop.slice(1).map(Number);
    assert.ok(Math.max(...channels) - Math.min(...channels) <= 3, "The light scrim must not impose a blue color cast");
  }
});

test("raises the hero viewpoint without changing pointer parallax", async () => {
  const [css, frame] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-frame.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(css, /\.hero-image\s*\{[^}]*background-position:\s*50% 28%;[^}]*transform-origin:\s*50% 20%;/s);
  assert.match(css, /transform:\s*translate3d\(var\(--hero-shift-x\), var\(--hero-shift-y\), 0\) scale\(1\.07\);/);
  assert.match(css, /transition:\s*transform 180ms linear;/);
  assert.ok(frame.includes('(event.clientX / window.innerWidth - 0.5) * -10'));
  assert.ok(frame.includes('(event.clientY / window.innerHeight - 0.5) * -8'));
  // The upper source point must move down into view even where cover crops only
  // horizontally. Existing overscan must cover both extremes of the mouse pan.
  for (const [width, height] of [[2560, 1229], [1920, 1080], [1265, 712], [390, 844]]) {
    const layerWidth = width + 48;
    const layerHeight = height + 48;
    const coverScale = Math.max(layerWidth / 1672, layerHeight / 941);
    const verticalCrop = 941 * coverScale - layerHeight;
    const previousTop = -24 - layerHeight * 0.07 * 0.5 - verticalCrop * 0.46 * 1.07;
    const raisedTop = -24 - layerHeight * 0.07 * 0.2 - verticalCrop * 0.28 * 1.07;
    assert.ok(raisedTop > previousTop, "Reveal more of the upper part of the photograph");
    const layerTop = -24 - layerHeight * 0.07 * 0.2;
    assert.ok(layerTop + 4 < 0, "No gap at the top during pointer movement");
    assert.ok(layerTop + layerHeight * 1.07 - 4 > height, "No gap at the bottom during pointer movement");
  }
});

test("uses SimSun for every marked Chinese passage and separates bilingual project lines", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const [researchResponse, publicationsResponse] = await Promise.all([
    render("/research/"),
    render("/publications/"),
  ]);
  const researchHtml = await researchResponse.text();
  const publicationsHtml = await publicationsResponse.text();

  assert.match(css, /@font-face\s*\{[^}]*font-family:\s*"Group Songti";[^}]*local\("SimSun"\)[^}]*local\("宋体"\)/s);
  assert.match(css, /:lang\(zh-CN\),\s*\.zh-copy\s*\{[^}]*font-family:\s*"Group Songti",\s*"SimSun",\s*"宋体"[^;]*!important;/s);
  assert.match(css, /\.is-interior \.project-card h3\s*\{[^}]*line-height:\s*1\.25;/s);
  assert.match(css, /\.is-interior \.project-card \.system-title-zh\s*\{[^}]*line-height:\s*1\.82;/s);
  assert.match(css, /\.is-interior \.project-meta \[lang="zh-CN"\]\s*\{[^}]*font-size:\s*0\.9rem;/s);
  assert.match(researchHtml, /project-sponsor-zh zh-copy" lang="zh-CN"/);
  assert.match(researchHtml, /主持（结题）/);
  assert.match(publicationsHtml, /class="zh-copy" lang="zh-CN"[^>]*>[\s\S]{0,80}王杰/);
});

test("publishes the verified principal investigator profile in a compact people page", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const response = await render("/people/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /0000-0003-2520-2920/);
  assert.match(html, /jvNCMNgAAAAJ/);
  assert.match(html, /teachInfo\.jsp\?id=689/);
  assert.match(html, /Principal Investigator/);
  assert.match(html, /Current Members/);
  assert.match(html, /class="faculty-card glass-panel"/);
  assert.match(css, /\.faculty-copy > h1\s*\{[^}]*font-size:\s*clamp\(2\.15rem, 3vw, 3\.35rem\);/s);
  assert.match(css, /\.people-section-heading h2\s*\{[^}]*white-space:\s*nowrap;/s);
  assert.match(html, /Alumni/);
  assert.match(html, /Name to be added/);
  assert.match(html, /faculty-intro/);
  assert.ok(html.indexOf('id="faculty-title"') < html.indexOf('class="profile-bio"'));
  assert.ok(html.indexOf('class="profile-bio"') < html.indexOf('class="portrait-wrap"'));
  assert.match(css, /\.faculty-overview\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) 12rem;[^}]*align-items:\s*center;/s);
  assert.match(css, /\.people-hub \.portrait\s*\{[^}]*max-width:\s*114px;[^}]*margin:\s*0;/s);
  assert.match(css, /@container faculty \(max-width:\s*38rem\)/);
  assert.match(html, /page-watermark people-page-watermark/);
  assert.match(html, /work-water\.webp/);
  assert.doesNotMatch(html, /flood-hero-minnesota|flood-hero-pakistan/);
  assert.match(html, /wang-jie-portrait-hd\.jpg/);
  assert.match(html, /width="413" height="531"/);
  assert.doesNotMatch(html, /portrait-code|PI \/ 01/);
  assert.doesNotMatch(html, /Graduate Students/);
});

test("publishes the verified publication record under its own route", async () => {
  const response = await render("/publications/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /page-watermark publication-page-watermark/);
  assert.match(html, /flood-hero-minnesota\.jpg/);
  assert.doesNotMatch(html, /work-water\.webp|flood-hero-pakistan/);
  assert.match(html, /Papers/);
  assert.doesNotMatch(html, /publication-number/);
  assert.equal((html.match(/class="publication-year" dateTime="\d{4}"/g) || []).length, 38);
  assert.equal((html.match(/class="publication-authors"/g) || []).length, 38);
  assert.match(html, /Wang J, Chang Y, Shangguan D, Dong Y, Zhao Q, He X, Zhang S/);
  assert.match(html, /Yun X, Wang J, Wu H, et al\./);
  assert.match(html, /Books/);
  assert.match(html, /Intellectual Property/);
  assert.match(html, /10\.1175\/JHM-D-26-0019\.1/);
  assert.match(html, /10\.3390\/rs17081342/);
  assert.match(html, /10\.1029\/2021WR029734/);
  assert.match(html, /Water Hazards: Drought and Flood/);
  assert.match(html, /2025SR0415905/);
  assert.match(html, /流域高性能水要素监测与预报系统软件V1\.0/);
  assert.match(html, /坡度对坡面降雨产流规律的影响/);
  assert.doesNotMatch(html, /knowledge-card|knowledge-grid|ip-card/);
  assert.doesNotMatch(html, /Peer-reviewed research record|Research translated|Long-form work/);
  assert.doesNotMatch(html, /Publication · 2014–2026|Research that|moves with water|Peer-reviewed papers/);
  assert.doesNotMatch(html, /supplied curriculum vitae|presented in English|original Chinese/i);
  assert.doesNotMatch(html, /10\.5281\/zenodo\.14560820/);
});

test("links both operational monitoring systems", async () => {
  const response = await render("/research/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /GBMMS\.html/);
  assert.match(html, /LMRBMS\.html/);
  assert.match(html, /page-watermark research-page-watermark/);
  assert.match(html, /mekong-satellite\.webp/);
  assert.match(html, /188649f5-bbef-4588-a44c-e6af578b0238/);
  assert.match(html, /10\.11888\/Atmos\.tpdc\.303450/);
  assert.match(html, /黄河源逐日0\.1°校正气象数据集/);
  assert.match(html, /Funding · Principal Investigator/);
  assert.match(html, /黄河源洪水成因解析和未来变化预估/);
  assert.match(html, /柳江流域精细化分布式预报模型建设改进与调试/);
  assert.doesNotMatch(html, /From flood science|Shared for reuse|Funded projects led by the group/);
  assert.doesNotMatch(html, /selected projects hosted|presented in English|original Chinese record/i);
  assert.doesNotMatch(html, /Future Star Meteorological/);
  assert.doesNotMatch(html, /Research Areas/);
  assert.doesNotMatch(html, /Research Index/);
  assert.doesNotMatch(html, /10\.5281\/zenodo\.14560820/);
  assert.doesNotMatch(html, /Research · Basin Intelligence|One system|Three scales|From hillslopes/);
});

test("uses the Yellow River Delta image for the contact page", async () => {
  const response = await render("/contact/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /contact-yellow-river\.jpg/);
  assert.match(html, /NASA Earth Observatory/);
  assert.doesNotMatch(html, /contact-earth\.webp/);
});

test("ships the final brand and social assets", async () => {
  const [layout] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    access(new URL("../public/assets/flood-hero-minnesota.jpg", import.meta.url)),
    access(new URL("../public/assets/flood-hero-pakistan.jpg", import.meta.url)),
    access(new URL("../public/assets/flood-hero-village.jpg", import.meta.url)),
    access(new URL("../public/assets/flood-hero-village-enhanced.png", import.meta.url)),
    access(new URL("../public/assets/flood-global-change-logo-frosted.png", import.meta.url)),
    access(new URL("../public/assets/contact-yellow-river.jpg", import.meta.url)),
    access(new URL("../public/assets/og.png", import.meta.url)),
  ]);

  assert.match(layout, /assets\/flood-global-change-logo-frosted\.png/);
  assert.doesNotMatch(layout, /favicon\.svg/);
});
