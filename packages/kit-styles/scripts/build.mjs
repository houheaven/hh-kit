// kit-styles 极简构建:纯 CSS 直接复制到 dist,无需转译
// 后续如需 SCSS / PostCSS 处理可在此扩展
import { cp, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))
const src = resolve(root, '../src')
const dist = resolve(root, '../dist')

if (existsSync(dist)) {
  await rm(dist, { recursive: true })
}
await mkdir(dist, { recursive: true })
await cp(src, dist, { recursive: true })
console.log('kit-styles built.')
