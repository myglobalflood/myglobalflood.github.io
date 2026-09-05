import { constants } from "node:fs";
import { copyFile, lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const manifestName = "pages-asset-manifest.json";

async function filesIn(directory, prefix = "") {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) result.push(...await filesIn(path.join(directory, entry.name), `${name}/`));
    else if (entry.isFile()) result.push(name);
  }
  return result;
}

function assetPath(root, name) {
  if (!/^_next\/static\/[a-zA-Z0-9_./~-]+$/.test(name) || name.split("/").includes("..")) {
    throw new Error(`Invalid retained asset path: ${name}`);
  }
  return path.join(root, name);
}

export async function preparePagesAssets(output, previous = []) {
  const currentAssets = (await filesIn(path.join(output, "_next/static")))
    .map((name) => `_next/static/${name}`).sort();
  let retained = 0;

  // Keep only each release's own assets, never its inherited history. This bounds
  // the export to the current release plus two predecessors while caches expire.
  for (const directory of previous.slice(0, 2)) {
    let names;
    try {
      names = JSON.parse(await readFile(path.join(directory, manifestName), "utf8")).assets;
      if (!Array.isArray(names)) throw new Error("Invalid Pages asset manifest");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      names = (await filesIn(path.join(directory, "_next/static")))
        .map((name) => `_next/static/${name}`);
    }
    for (const name of names) {
      const source = assetPath(directory, name);
      const destination = assetPath(output, name);
      if (!(await lstat(source)).isFile()) throw new Error(`Not a regular asset: ${name}`);
      await mkdir(path.dirname(destination), { recursive: true });
      try {
        await copyFile(source, destination, constants.COPYFILE_EXCL);
        retained += 1;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
    }
  }

  const htmlFiles = (await filesIn(output)).filter((name) => name.endsWith(".html"));
  for (const name of htmlFiles) {
    const html = await readFile(path.join(output, name), "utf8");
    const assets = [...html.matchAll(/(?:href|src)="([^"?#]*\/_next\/static\/[^"?#]+)(?:[?#][^"]*)?"/g)];
    if (name === "contact/index.html" && !assets.some((match) => match[1].endsWith(".css"))) {
      throw new Error("Contact export has no stylesheet");
    }
    for (const [, url] of assets) {
      const relative = url.slice(url.indexOf("_next/static/"));
      if (!(await lstat(assetPath(output, relative))).isFile()) {
        throw new Error(`Missing asset for ${name}: ${relative}`);
      }
    }
  }
  await writeFile(path.join(output, manifestName), `${JSON.stringify({ assets: currentAssets }, null, 2)}\n`);
  return { checkedPages: htmlFiles.length, currentAssets: currentAssets.length, retainedAssets: retained };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [output = "out", ...previous] = process.argv.slice(2);
  console.log(await preparePagesAssets(path.resolve(output), previous.map((directory) => path.resolve(directory))));
}
