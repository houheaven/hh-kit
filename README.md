# hh-kit

后天堂（houheaven）前端套件的 monorepo 仓库，收纳通用组件、工具函数与设计资产，多前端框架共用同一套核心能力。

## 特性

- **多框架支持**：同源设计，产出 Vue 3 与 React 18+ 两套组件库，接口与视觉保持对齐。
- **按需引入**：所有对外组件采用子路径导出（subpath exports），配合 tree-shaking 只打包用到的部分。
- **CSS 自动注入**：消费方引入组件时无需手动 import 样式，构建产物自动加载对应 CSS。
- **双格式产物**：同时输出 ESM 与 CJS，兼容 Vite / Webpack / Rollup 等主流构建工具，并附带完整 TypeScript 类型声明。
- **Monorepo 工程化**：基于 PNPM Workspace + Turborepo 组织多包依赖，使用 Changesets 管理版本发布。

## 仓库结构

```
hh-kit/
├── apps/                 # 演示应用
│   ├── demo-vue/         # Vue 组件示例站点
│   └── demo-react/       # React 组件示例站点
├── packages/             # 可发布 / 内部包
│   ├── kit-vue/          # Vue 3 组件库（npm 发布）
│   ├── kit-react/        # React 18+ 组件库（npm 发布）
│   ├── kit-core/         # 与框架无关的核心逻辑
│   ├── kit-shared/       # 跨框架共享工具
│   ├── kit-tokens/       # 设计 tokens（颜色、间距等）
│   ├── kit-styles/       # 通用样式与动效
│   ├── kit-assets/       # 品牌图片与数据资产
│   └── kit-icons/        # 图标库
├── configs/              # 共享构建 / 类型配置
└── scripts/              # 工程脚手架脚本
```

## 已发布组件库

| 包 | 说明 | 版本 |
| --- | --- | --- |
| [`@houheaven/kit-vue`](./packages/kit-vue) | Vue 3 组件套件 | [![npm](https://img.shields.io/npm/v/@houheaven/kit-vue.svg)](https://www.npmjs.com/package/@houheaven/kit-vue) |
| [`@houheaven/kit-react`](./packages/kit-react) | React 18+ 组件套件 | [![npm](https://img.shields.io/npm/v/@houheaven/kit-react.svg)](https://www.npmjs.com/package/@houheaven/kit-react) |

当前提供的组件：

- **hh-footer**：可定制分组导航与版权文字的页脚组件。
- **hh-image-dialog**：轻量图片弹窗，适用于二维码等图片展示场景。

## 环境要求

- Node.js `>= 18`
- PNPM `>= 9`（推荐使用仓库锁定的 `packageManager` 版本）

## 命名规范

- 核心组件库统一使用 `hh-` 前缀（如 `hh-footer`、`hh-image-dialog`），在任何位置引用时保留小写前缀，不写作首字母大写形式。
- 演示应用内部组件使用 `v-` 前缀，避免与库组件混淆。
- 文件与目录命名使用小写连字符（kebab-case）。

## 相关链接

- GitHub 仓库：<https://github.com/houheaven/hh-kit>
- 反馈 / 建议：<https://github.com/houheaven/hh-kit/issues>

## License

[MIT](./LICENSE) © 立树
