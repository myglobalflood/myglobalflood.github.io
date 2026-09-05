import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { preparePagesAssets } from "../scripts/prepare-pages-assets.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "flood-pages-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

async function release(root, name, assetName) {
  const directory = path.join(root, name);
  await mkdir(path.join(directory, "_next/static/chunks"), { recursive: true });
  await mkdir(path.join(directory, "contact"), { recursive: true });
  await writeFile(path.join(directory, "_next/static/chunks", assetName), ".contact { display: grid; }");
  await writeFile(path.join(directory, "contact/index.html"), `<link rel="stylesheet" href="/_next/static/chunks/${assetName}">`);
  return directory;
}

test("keeps two releases of cached-page assets without accumulating inherited history", async (t) => {
  const root = await fixture(t);
  const old = await release(root, "old", "old~chunk.css");
  const previous = await release(root, "previous", "previous.css");
  await preparePagesAssets(previous, [old]);
  const current = await release(root, "current", "current.css");
  await preparePagesAssets(current, [previous, old]);
  const next = await release(root, "next", "next.css");
  const result = await preparePagesAssets(next, [current, previous]);
  assert.equal(result.retainedAssets, 2);
  await assert.rejects(readFile(path.join(next, "_next/static/chunks/old~chunk.css")), { code: "ENOENT" });
  assert.deepEqual(JSON.parse(await readFile(path.join(next, "pages-asset-manifest.json"), "utf8")).assets,
    ["_next/static/chunks/next.css"]);
});

test("rejects missing Contact styles and broken exported resource references", async (t) => {
  const root = await fixture(t);
  const output = await release(root, "out", "site.css");
  await writeFile(path.join(output, "contact/index.html"), "<main>Contact</main>");
  await assert.rejects(preparePagesAssets(output), /Contact export has no stylesheet/);
  await writeFile(path.join(output, "contact/index.html"), '<link rel="stylesheet" href="/_next/static/chunks/missing.css">');
  await assert.rejects(preparePagesAssets(output), { code: "ENOENT" });
});

test("never overwrites current assets and rejects traversal in a prior manifest", async (t) => {
  const root = await fixture(t);
  const output = await release(root, "out", "site.css");
  const previous = await release(root, "previous", "site.css");
  await writeFile(path.join(output, "_next/static/chunks/site.css"), "current styles");
  await preparePagesAssets(output, [previous]);
  assert.equal(await readFile(path.join(output, "_next/static/chunks/site.css"), "utf8"), "current styles");
  await writeFile(path.join(previous, "pages-asset-manifest.json"), JSON.stringify({ assets: ["_next/static/../../../private"] }));
  await assert.rejects(preparePagesAssets(output, [previous]), /Invalid retained asset path/);
});
