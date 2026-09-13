
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => `index.${format === "es" ? "js" : "cjs"}`,
    },
    // 内部私有包必须 bundle 进产物,外部用户 install 时只见 react 这一个 peer
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: { react: "React" },
        assetFileNames: assetInfo => {
          if (assetInfo.name === "style.css") return "style.css";
          return assetInfo.name ?? "asset-[hash][extname]";
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
