import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const response = await fetch("http://[::1]:3000/");

if (!response.ok) {
  throw new Error(`Local site request failed: ${response.status}`);
}

let html = await response.text();
let css = await readFile(resolve(root, "app", "globals.css"), "utf8");
const clientScript = await readFile(
  resolve(root, "scripts", "static-site.js"),
  "utf8",
);
const mekong = await readFile(
  resolve(root, "public", "assets", "mekong-satellite.jpg"),
);
const portrait = await readFile(
  resolve(root, "public", "assets", "wang-jie.jpg"),
);

css = css
  .replace('@import "tailwindcss";', "")
  .replace(
    /url\("\/assets\/mekong-satellite\.jpg"\)/g,
    `url("data:image/jpeg;base64,${mekong.toString("base64")}")`,
  )
  .replace(
    /url\("\/assets\/wang-jie\.jpg"\)/g,
    `url("data:image/jpeg;base64,${portrait.toString("base64")}")`,
  );

html = html
  .replace(/<script\b[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*>/gi, "")
  .replace(/<meta\b[^>]*(?:og:image|twitter:image)[^>]*>/gi, "")
  .replace(
    "</head>",
    `<style>:root{--font-geist-sans:"Segoe UI","Noto Sans SC",sans-serif;--font-geist-mono:"SFMono-Regular",Consolas,monospace}${css}</style></head>`,
  )
  .replace("</body>", `<script>${clientScript}</script></body>`);

await writeFile(resolve(root, "index.html"), html, "utf8");
console.log(`Exported standalone site (${Buffer.byteLength(html)} bytes)`);
