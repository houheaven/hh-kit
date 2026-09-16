
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

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

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ["src"] }),
  ],
  build: {
    lib: {
      entry: entryInputs,
    },
    // 内部私有包必须 bundle 进产物,外部用户 install 时只见 vue 这一个 peer
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          format: "es",
          entryFileNames: entryFileEs,
          chunkFileNames: "chunks/[name]-[hash].js",
          assetFileNames: assetFile,
          exports: "named",
          globals: { vue: "Vue" },
        },
        {
          format: "cjs",
          entryFileNames: entryFileCjs,
          chunkFileNames: "chunks/[name]-[hash].cjs",
          assetFileNames: assetFile,
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
