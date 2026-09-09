import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  // 私有依赖打进产物,避免下游需要额外安装
  noExternal: ['@houheaven/kit-shared'],
})
