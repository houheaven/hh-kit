
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ["src"], insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: format => `index.${format === "es" ? "js" : "cjs"}`,
    },
    // 内部私有包必须 bundle 进产物,外部用户 install 时只见 vue 这一个 peer
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" },
        assetFileNames: assetInfo => {
          const primaryName = assetInfo.names[0];
          return primaryName === "style.css" ? "style.css" : primaryName;
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
