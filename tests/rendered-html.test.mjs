import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /Floods,/);
  assert.match(html, /flood-hero\.webp/);
  assert.doesNotMatch(html, /AHS Lab|Advanced Hydrological Simulation/);
});

test("publishes the verified principal investigator profile in a compact people page", async () => {
  const response = await render("/people/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /0000-0003-2520-2920/);
  assert.match(html, /jvNCMNgAAAAJ/);
  assert.match(html, /teachInfo\.jsp\?id=689/);
  assert.match(html, /Principal Investigator/);
  assert.doesNotMatch(html, /Graduate Students/);
});

test("publishes the verified publication record under its own route", async () => {
  const response = await render("/publications/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Publication · 2018–2026/);
  assert.match(html, /10\.1175\/JHM-D-26-0019\.1/);
  assert.match(html, /10\.3390\/rs17081342/);
  assert.match(html, /10\.1029\/2021WR029734/);
  assert.doesNotMatch(html, /10\.5281\/zenodo\.14560820/);
});

test("links both operational monitoring systems", async () => {
  const response = await render("/research/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /GBMMS\.html/);
  assert.match(html, /LMRBMS\.html/);
  assert.match(html, /10\.5281\/zenodo\.14560820/);
  assert.match(html, /Funding &amp; Recognition/);
  assert.doesNotMatch(html, /Research Areas/);
});

test("ships the final brand and social assets", async () => {
  const [layout] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    access(new URL("../public/assets/flood-hero.webp", import.meta.url)),
    access(new URL("../public/assets/flood-global-change-logo.jpg", import.meta.url)),
    access(new URL("../public/assets/og.png", import.meta.url)),
  ]);

  assert.match(layout, /assets\/flood-global-change-logo\.jpg/);
  assert.doesNotMatch(layout, /favicon\.svg/);
});
