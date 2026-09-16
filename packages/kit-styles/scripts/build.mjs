// kit-styles 构建:.less 编译为同名 .css,其他 .css 直接复制到 dist
// 支持 --watch:监听 src 变化时增量重建
import { existsSync, watch } from "fs";
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { basename, dirname, extname, resolve } from "path";
import { fileURLToPath } from "url";
import less from "less";

const root = dirname(fileURLToPath(import.meta.url));
const src = resolve(root, "../src");
const dist = resolve(root, "../dist");

async function buildOne(fileName) {
  const from = resolve(src, fileName);
  const ext = extname(fileName);

  if (ext === ".less") {
    const raw = await readFile(from, "utf-8");
    const { css } = await less.render(raw, { filename: from });
    const to = resolve(dist, `${basename(fileName, ".less")}.css`);
    await writeFile(to, css, "utf-8");
    return;
  }

  if (ext === ".css") {
    await copyFile(from, resolve(dist, fileName));
  }
}

async function buildAll() {
  if (existsSync(dist)) {
    await rm(dist, { recursive: true });
  }
  await mkdir(dist, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  await Promise.all(entries.filter(e => e.isFile()).map(e => buildOne(e.name)));
}

await buildAll();
console.log("kit-styles built.");

if (process.argv.includes("--watch")) {
  console.log("watching src...");
  watch(src, { persistent: true }, (_evt, fileName) => {
    if (!fileName) return;
    buildOne(fileName)
      .then(() => console.log(`rebuilt: ${fileName}`))
      .catch(err => console.error(`build failed: ${fileName}`, err));
  });
}
