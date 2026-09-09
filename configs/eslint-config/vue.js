// Vue 场景 ESLint 规则:继承基础规则,追加 Vue 相关约束
import base from './index.js'

export default [
  ...base,
  {
    files: ['**/*.vue'],
    rules: {},
  },
]
