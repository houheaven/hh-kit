
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { visualizer } from "rollup-plugin-visualizer";

// 多入口配置:全量桶入口 + 每个组件的独立子入口
// key(camel) 对应输出子目录(kebab)。索引写法确保下游函数只需字符串查表
const entryInputs: Record<string, string> = {
  index: "src/index.ts",
  hhFooter: "src/hh-footer/index.ts",
  hhImageDialog: "src/hh-image-dialog/index.ts",
};

const entryDirs: Record<string, string> = {
  index: "",
  hhFooter: "hh-footer/",
  hhImageDialog: "hh-image-dialog/",
};

// CSS 命名反查表:Vite 会用 kebab 名 (如 hh-footer.css) 作为资产 primary name
const cssKebabToDir: Map<string, string> = new Map([
  ["hh-footer", "hh-footer/"],
  ["hh-image-dialog", "hh-image-dialog/"],
]);

function getEntryDir(name: string): string {
  const dir = entryDirs[name];
  return typeof dir === "string" ? dir : "";
}

function resolveCssName(name: string): string {
  const base = name.replace(/\.css$/u, "");
  const dir = cssKebabToDir.get(base);
  if (typeof dir === "string") {
    return `${dir}style.css`;
  }
  return "style.css";
}

function resolveAssetName(primaryName: string): string {
  if (!primaryName.endsWith(".css")) {
    return primaryName;
  }
  return resolveCssName(primaryName);
}

interface RollupChunkLike {
  name: string;
}
interface RollupAssetLike {
  names: string[];
}

function entryFileEs(chunk: RollupChunkLike): string {
  return `${getEntryDir(chunk.name)}index.js`;
}
function entryFileCjs(chunk: RollupChunkLike): string {
  return `${getEntryDir(chunk.name)}index.cjs`;
}
function assetFile(asset: RollupAssetLike): string {
  const primary = asset.names.length > 0 ? asset.names[0] : "";
  return resolveAssetName(primary);
}

// 用 Map 存 kebab 名的 external globals,避开对象字面量 kebab key 的 lint 限制
const rollupGlobalsMap: Map<string, string> = new Map([
  ["react", "React"],
  ["react-dom", "ReactDOM"],
]);
const rollupGlobals: Record<string, string> = Object.fromEntries(rollupGlobalsMap);

export default defineConfig({
  plugins: [
    react(),
    // 自动在每个 entry chunk 顶部注入 `import "./style.css"`,消费方只需引组件即可
    libInjectCss(),
    dts({ include: ["src"] }),
    // build 后生成 dist/stats.html,展示每个 chunk / 依赖的字节占比
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
  ],
  build: {
    lib: {
      entry: entryInputs,
    },
    // 内部私有包必须 bundle 进产物,外部用户 install 时只见 react/react-dom 这两个 peer
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      output: [
        {
          format: "es",
          entryFileNames: entryFileEs,
          chunkFileNames: "chunks/[name]-[hash].js",
          assetFileNames: assetFile,
          exports: "named",
          globals: rollupGlobals,
        },
        {
          format: "cjs",
          entryFileNames: entryFileCjs,
          chunkFileNames: "chunks/[name]-[hash].cjs",
          assetFileNames: assetFile,
          exports: "named",
          globals: rollupGlobals,
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
  },
});
