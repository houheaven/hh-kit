
/* eslint-disable arrow-body-style */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import vue from "@vitejs/plugin-vue2";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// src 下每个目录就是一个组件，各自作为独立入口打包，使用方才能只引入用到的组件
const components = readdirSync("src", { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(item => item.name);

export default defineConfig({
  plugins: [
    vue(),
    // 在每个组件的产物里自动 import 它自己的样式，按需引入组件时样式随之按需加载
    libInjectCss(),
    dts({ include: ["src"], processor: "vue" }),
    // build 后生成 dist/stats.html，展示每个 chunk / 依赖的字节占比
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
    {
      // 合并出全量样式 dist/style.css，供不经打包器处理样式的场景（如 SSR）手动引入
      name: "merge-style",
      closeBundle(): void {
        writeFileSync("dist/style.css", components.map(name => readFileSync(`dist/${name}/style.css`, "utf8")).join(""));
      },
    },
  ],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        ...Object.fromEntries(components.map(name => [name, `src/${name}/index.ts`])),
      },
    },
    rollupOptions: {
      // vue 由使用方提供，打进产物会导致页面里出现两份 Vue
      external: ["vue"],
      output: [
        {
          format: "es",
          entryFileNames: (info): string => {
            return info.name === "index" ? "index.js" : `${info.name}/index.js`;
          },
          assetFileNames: (info): string => {
            const name = info.names[0]?.replace(/.css$/u, "");
            return components.includes(name) ? `${name}/style.css` : "[name][extname]";
          },
          chunkFileNames: "chunks/[name]-[hash].js",
          exports: "named",
          globals: { vue: "Vue" },
        },
        {
          format: "cjs",
          entryFileNames: (info): string => {
            return info.name === "index" ? "index.cjs" : `${info.name}/index.cjs`;
          },
          assetFileNames: (info): string => {
            const name = info.names[0]?.replace(/.css$/u, "");
            return components.includes(name) ? `${name}/style.css` : "[name][extname]";
          },
          chunkFileNames: "chunks/[name]-[hash].cjs",
          exports: "named",
          globals: { vue: "Vue" },
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
  },
});
