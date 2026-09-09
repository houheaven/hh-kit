# hh-kit Monorepo 组织方案

面向 Vue、React 双技术栈组件库的 Monorepo 组织方案。


## 一、决策矩阵

| 维度 | 决策 | 说明 |
|---|---|---|
| 共享边界 | 深度共享:含无框架核心层 | 抽出 kit-core(纯 TS,不依赖框架)承载业务逻辑核心 |
| 顶层布局 | packages/ + apps/ 双顶层 | 可发布包与本地应用职责分离 |
| 构建工具 | pnpm workspaces + turborepo | 依赖管理 + 任务编排,增量缓存 |
| 包命名 | `@houheaven/kit-<name>` | 与 monorepo 名对齐,npm 上避免冲突 |
| 发布策略 | 仅发 kit-vue、kit-react | 其余为私有内部包,bundle 进产物 |
| 文档站 | 外部独立 VitePress 仓库 | 通过 pnpm link 与 hh-kit 联动 |
| 本地开发验证 | apps/demo-vue、apps/demo-react | 组件开发时的活体测试环境 |
| 共享配置 | configs/tsconfig、configs/eslint-config | 内部私有包,workspace 引用 |
| 设计资产 | kit-tokens、kit-icons、kit-styles | 三包各司其职 |
| kit-icons 产物 | 同时输出 Vue / React 组件 | 兼顾开发体验与 tree-shaking |
| kit-styles 定位 | 只放通用/公共样式 | 组件样式由 kit-vue/kit-react 各自 bundle |
| 版本管理 | changesets | Monorepo 版本管理事实标准 |
| 版本策略 | Independent 独立版本号 | 两个对外包各自迭代 |


## 二、目录结构

```
hh-kit/                              # @houheaven/kit-monorepo (root, private)
├── packages/
│   ├── kit-core/                    # @houheaven/kit-core       [private] 无框架核心
│   ├── kit-shared/                  # @houheaven/kit-shared     [private] 通用工具/类型
│   ├── kit-tokens/                  # @houheaven/kit-tokens     [private] 设计变量
│   ├── kit-icons/                   # @houheaven/kit-icons      [private] SVG + Vue/React 组件
│   ├── kit-styles/                  # @houheaven/kit-styles     [private] 通用样式
│   ├── kit-vue/                     # @houheaven/kit-vue        [publish] Vue 组件库
│   └── kit-react/                   # @houheaven/kit-react      [publish] React 组件库
├── apps/
│   ├── demo-vue/                    # Vue 本地开发验证
│   └── demo-react/                  # React 本地开发验证
├── configs/
│   ├── tsconfig/                    # @houheaven/tsconfig       [private]
│   └── eslint-config/               # @houheaven/eslint-config  [private]
├── scripts/                         # 仓库级脚本
├── .changeset/
│   └── config.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── package.json
```


## 三、依赖分层与拓扑

### 分层规则

| 层级 | 包 | 依赖上游 | 关键约束 |
|---|---|---|---|
| L0 基础层 | kit-tokens、kit-icons、kit-styles | 无 | 纯静态资产,不含 JS 逻辑 |
| L1 无框架核心 | kit-core、kit-shared | L0 | 禁止 import vue/react |
| L2 框架适配 | kit-vue、kit-react | L0、L1 | 只做壳:模板 + 事件绑定 |
| L3 应用 | apps/* | L0-L2 | 只消费,不被依赖 |

### 依赖拓扑

```
              ┌──────────────────────────────┐
              │  kit-vue [pub]   kit-react [pub]
              └──────┬──────────────┬────────┘
                     │              │
      ┌──────────────┼──────────────┼────────────┐
      │              │              │            │
   kit-core     kit-shared     kit-icons     kit-styles
  (无框架)    (工具/类型)      (SVG+组件)    (通用样式)
      │              │              │            │
      └──────────────┴──────┬───────┴────────────┘
                            ▼
                       kit-tokens
                       (设计变量)
```

**核心约束**
- 上层可依赖下层,同层禁止相互依赖(kit-vue ↛ kit-react)
- kit-core、kit-shared 不依赖任何设计资产,保持纯净
- 所有私有包在 kit-vue / kit-react 打包时必须被 bundle 进产物


## 四、关键技术决策

### 4.1 为什么选 pnpm + turborepo

pnpm workspaces 与 turborepo 是互补关系,不冲突:
- **pnpm workspaces** 负责依赖管理(把 `packages/*` 拓扑串起来,内部包互相 `link`)
- **turborepo** 负责任务编排(build / test / lint 的依赖顺序、并行、增量缓存)

turborepo 核心能力:
1. 任务依赖图:声明 `kit-vue` 的 build 依赖 `kit-core` 的 build,自动按拓扑顺序执行
2. 本地缓存:同一份输入不会重复 build,秒级返回结果
3. 并行执行:自动榨干 CPU 多核
4. 远端缓存(可选):CI 与本地共享缓存

方案对比:

| 方案 | 上手 | 增量能力 | 适合规模 |
|---|---|---|---|
| 仅 pnpm | 极简 | 无 | 3-5 个包以内 |
| **pnpm + turbo** | 简单 | 强 | 5-30 个包(本项目场景) |
| pnpm + Nx | 复杂 | 最强 | 30+ 包 / 有代码生成需求 |

### 4.2 只发布 kit-vue、kit-react 的实现

私有包(kit-core、kit-shared、kit-tokens 等)的处理关键:

1. **package.json 加 `"private": true`**,changesets 自动跳过
2. **kit-vue / kit-react 打包时必须 bundle 私有包**,不能作为 external:

    ```ts
    // packages/kit-vue/vite.config.ts
    rollupOptions: {
      external: ['vue'],   // 只把 peer 依赖 external
    }
    // 私有依赖不列入 external,自动被 bundle
    ```

3. **package.json 依赖声明**:
    - 私有包放在 `dependencies` + `workspace:*` 协议
    - peer 依赖(vue、react)放在 `peerDependencies`

**收益**
- 发布产物精简,用户只见到 kit-vue / kit-react
- 内部可以自由重构私有包,不影响对外 API
- 版本管理简单

**代价**
- 打包产物略变大,但 tree-shaking 依然生效

### 4.3 kit-icons 双入口设计

同时输出 SVG 字符串、Vue 组件、React 组件三种入口:

```json
{
  "exports": {
    ".": "./dist/index.js",           // SVG 字符串
    "./vue": "./dist/vue/index.js",   // <HhIcon />
    "./react": "./dist/react/index.js" // <Icon />
  }
}
```

kit-vue / kit-react 直接 re-export 对应入口,避免重复实现。

### 4.4 外部 VitePress 文档站联动

hh-kit 内不放正式文档站,外部独立 VitePress 仓库消费发布版或通过 pnpm link 直连源码。

**链路示意**

```
[hh-kit]                              [独立 VitePress 仓库]
pnpm --filter kit-vue dev             pnpm docs:dev
  ↓ 监听 src/                            ↓
  ↓ 重建 dist/                          从 node_modules/@houheaven/kit-vue
  ↓                                     (symlink → hh-kit/packages/kit-vue/dist)
  ↓                                     读取新产物
                                          ↓
                                        触发 HMR
```

**pnpm link 一次性设置**

```bash
# hh-kit 侧
cd packages/kit-vue && pnpm link --global
cd ../kit-react     && pnpm link --global

# 外部 VitePress 仓库侧
pnpm link --global @houheaven/kit-vue @houheaven/kit-react
```

**取消链接**

```bash
pnpm unlink --global @houheaven/kit-vue
```
之后 `pnpm install` 会重新拉 npm 上的版本。


## 五、配置文件骨架

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'configs/*'
```

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build":     { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev":       { "cache": false, "persistent": true },
    "test":      { "dependsOn": ["^build"] },
    "lint":      {},
    "typecheck": { "dependsOn": ["^build"] },
    "clean":     { "cache": false }
  }
}
```

### 根 package.json scripts

```json
{
  "scripts": {
    "build":            "turbo run build",
    "dev":              "turbo run dev",
    "test":             "turbo run test",
    "lint":             "turbo run lint",
    "typecheck":        "turbo run typecheck",
    "clean":            "turbo run clean && rm -rf node_modules",
    "changeset":        "changeset",
    "version-packages": "changeset version",
    "release":          "turbo run build --filter=./packages/kit-vue --filter=./packages/kit-react && changeset publish"
  }
}
```

### .changeset/config.json

```json
{
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

> 私有包由 `"private": true` 自动跳过发布,无需在 `ignore` 里重复声明。


## 六、常用工作流

### 日常开发

```bash
pnpm dev                                    # 所有包 watch
pnpm --filter @houheaven/kit-vue dev        # 只 watch 单个包
pnpm --filter @houheaven/demo-vue dev       # 启动 Vue Demo (:5173)
pnpm --filter @houheaven/demo-react dev     # 启动 React Demo (:5174)
```

### 构建与验证

```bash
pnpm build                                  # 全量构建(turbo 缓存)
pnpm typecheck                              # 全量类型检查
pnpm lint                                   # 全量 lint
```

### 版本发布

```bash
pnpm changeset          # 交互式:选包 → 选 patch/minor/major → 写变更描述
pnpm version-packages   # 应用变更,更新 package.json 版本号 + CHANGELOG
pnpm release            # 构建 + 发布到 npm(只推 kit-vue / kit-react)
```


## 七、工具链选型速览

| 场景 | 选型 | 理由 |
|---|---|---|
| 包管理 | pnpm workspaces | 硬链接节省磁盘,严格依赖隔离 |
| 任务编排 | turborepo | 增量缓存 + 并行 |
| 版本发布 | changesets | 独立版本号,Monorepo 事实标准 |
| 库打包(纯 TS) | tsup | ESM/CJS/DTS 一键出,零配置 |
| 库打包(Vue/React) | vite + vite-plugin-dts | 处理 SFC/JSX,产出 style.css |
| 类型 | TypeScript project references | 增量类型检查 |
| 文档站 | VitePress(独立仓库) | Vue/React 组件都能在 md 里 demo |


## 八、验证结果

初始搭建后跑通全链路:

| 验证项 | 结果 |
|---|---|
| `pnpm install` | 12 个 workspace 项目全部装好 |
| `pnpm build` 全量 | 9/9 tasks successful,~6s |
| `pnpm build` 二次 | 9/9 FULL TURBO 缓存,~50ms |
| kit-vue 产物 | index.{js,cjs,d.ts} + style.css |
| kit-react 产物 | index.{js,cjs,d.ts} |
| workspace 引用 | lock 里全部解析为 `link:` |


## 九、注意事项与踩坑记录

1. **私有包必须 bundle**:kit-vue / kit-react 打包时,`@houheaven/kit-core` 等内部私有包**必须被 bundle 进产物**,否则用户 install 后运行时会报找不到私有包。
2. **依赖声明**:私有包用 `dependencies` + `workspace:*`;peer 依赖(vue、react)放 `peerDependencies`;`devDependencies` 只放构建工具。
3. **同层禁止互相依赖**:kit-vue 不能依赖 kit-react,反之亦然。跨框架逻辑要抽到 kit-core。
4. **kit-core 保持无框架**:禁止 import 任何框架代码,否则会污染整个 L1 层。
5. **turbo cache 命中条件**:输入(源码 + package.json + turbo.json + 依赖 lock)完全一致才命中,注意 `outputs` 字段配置。
6. **发布前先 build**:`release` 脚本必须先 `turbo run build` 再 `changeset publish`,否则会发出空目录。
