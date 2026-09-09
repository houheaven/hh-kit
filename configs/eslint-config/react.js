// React 场景 ESLint 规则:继承基础规则,追加 React 相关约束
import base from './index.js'

export default [
  ...base,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {},
  },
]
