# @houheaven/kit-vue2

后天堂 Vue 2 组件套件，提供开箱即用的通用组件，支持按需引入与自动样式加载。

## 特性

- **Vue 2.7 + TypeScript**：完整类型定义，模板中即得类型提示。
- **子路径导出**：每个组件独立入口，按需引用不引入无关代码。
- **CSS 自动注入**：无需手动 import 样式文件，构建时自动加载。
- **双格式产物**：同时输出 ESM (`.js`) 与 CJS (`.cjs`)，兼容 Vite / Webpack / Rollup 等主流构建工具。
- **Tree-shaking 友好**：`sideEffects` 精确声明，未使用的组件不进入产物。

## 安装

```bash
pnpm add @houheaven/kit-vue2
# 或
npm install @houheaven/kit-vue2
# 或
yarn add @houheaven/kit-vue2
```

`vue ^2.7.0` 与 `vue-router ^3.0.0` 为 peer 依赖，请在项目中自行安装。

`hh-header` 与 `hh-menu` 依赖路由能力（`<router-link>`、`$route`、`$router`），使用前请先注册 `vue-router`。

## 使用

### 按需引入（推荐）

引入组件时无需手动导入 CSS，构建产物已自动注入。

```vue
<template>
  <div>
    <hh-header>我的站点</hh-header>
    <hh-menu :list="menu" />
  </div>
</template>

<script>
  import hhHeader from "@houheaven/kit-vue2/hh-header";
  import hhMenu from "@houheaven/kit-vue2/hh-menu";

  export default {
    components: { hhHeader, hhMenu },
    data() {
      return {
        menu: {
          tools: {
            title: "工具",
            list: [{ title: "颜色转换", descp: "HEX / RGB 互转", path: "/color" }],
          },
        },
      };
    },
  };
</script>
```

### 全量引入

```ts
import { hhHeader, hhGrids, hhMenu } from "@houheaven/kit-vue2";
```

### 手动引入样式

不经打包器处理样式的场景（如 SSR），可以手动引入样式文件：

```ts
// 全量样式
import "@houheaven/kit-vue2/style.css";
// 或单个组件的样式
import "@houheaven/kit-vue2/hh-header/style.css";
```

## 组件

### hh-header

页头组件，展示站点标题与当前页面副标题，右侧固定提供「更多插件」入口。标题点击后跳转到首页 `/`。

副标题取自当前路由的 `meta.title`，未配置时不显示。

**Slots**

| 名称 | 说明 |
| --- | --- |
| default | 站点标题，默认显示「标题」 |

**示例**

```vue
<template>
  <hh-header>我的站点</hh-header>
</template>

<script>
  import hhHeader from "@houheaven/kit-vue2/hh-header";

  export default {
    components: { hhHeader },
  };
</script>
```

```ts
// 路由配置：访问 /color 时页头显示「我的站点 > 颜色转换」
const routes = [
  { path: "/color", component: Color, meta: { title: "颜色转换" } },
];
```

### hh-grids

响应式栅格组件，按屏幕宽度切换每行显示的列数。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| list | `Record<string, any>[]` | `[]` | 数据列表，每项渲染为一个栅格单元 |
| span | `string \| number` | `""` | 每行列数（默认） |
| md | `string \| number` | `""` | 屏幕宽度 ≤ 1680px 时的每行列数 |
| pc | `string \| number` | `""` | 屏幕宽度 ≤ 1280px 时的每行列数 |
| pad | `string \| number` | `""` | 屏幕宽度 ≤ 1024px 时的每行列数 |
| phone | `string \| number` | `""` | 屏幕宽度 ≤ 767px 时的每行列数 |

列数取值范围为 `1` ~ `10`，全部留空时每行显示 1 列。

**Slots**

| 名称 | 作用域参数 | 说明 |
| --- | --- | --- |
| item | `list` 当前项的全部字段，以及 `index`（下标） | 单个栅格单元的内容 |
| default | — | 直接放入的子元素，同样按列数排布 |

**示例**

```vue
<template>
  <hh-grids :list="list" span="4" pad="3" phone="2">
    <template v-slot:item="item">
      <div class="card">{{ item.index + 1 }}. {{ item.title }}</div>
    </template>
  </hh-grids>
</template>

<script>
  import hhGrids from "@houheaven/kit-vue2/hh-grids";

  export default {
    components: { hhGrids },
    data() {
      return {
        list: [{ title: "卡片 A" }, { title: "卡片 B" }, { title: "卡片 C" }],
      };
    },
  };
</script>
```

### hh-menu

分组导航菜单组件，基于 `hh-grids` 排布，每个分组由标题和一组菜单项组成。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| list | `Record<string, MenuGroup>` | `{}` | 菜单分组，键名为分组标识 |

**MenuGroup**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| title | `string` | 分组标题 |
| cate | `"link" \| "html" \| "todo"` | 分组类型，决定菜单项的跳转方式与样式，可省略 |
| list | `MenuItem[]` | 菜单项列表 |

**MenuItem**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| title | `string` | 菜单项标题 |
| descp | `string` | 菜单项描述，为空时不显示 |
| url | `string` | 链接地址，`cate` 为 `link` / `html` 时使用 |
| path | `string` | 路由路径，其余情况下使用 |

**分组类型**

| cate | 点击行为 | 样式 |
| --- | --- | --- |
| 省略 | 通过 `$router.push` 跳转到 `path` | 绿色标题 |
| `link` | 新窗口打开 `url` | 蓝色标题 |
| `html` | 当前窗口打开 `url` | 绿色标题 |
| `todo` | 通过 `$router.push` 跳转到 `path` | 红色标题与边框，表示待完成 |

**示例**

```vue
<template>
  <hh-menu :list="menu" />
</template>

<script>
  import hhMenu from "@houheaven/kit-vue2/hh-menu";

  export default {
    components: { hhMenu },
    data() {
      return {
        menu: {
          tools: {
            title: "工具",
            list: [
              { title: "颜色转换", descp: "HEX / RGB 互转", path: "/color" },
            ],
          },
          links: {
            title: "友情链接",
            cate: "link",
            list: [
              { title: "后天堂工作室", descp: "更多插件", url: "http://studio.houheaven.com" },
            ],
          },
        },
      };
    },
  };
</script>
```

## 产物结构

```
dist/
├── index.{js,cjs,d.ts}          # 全量桶入口
├── style.css                    # 全量样式
├── hh-header/
│   ├── index.{js,cjs,d.ts}      # 子入口
│   └── style.css                # 独立样式
├── hh-grids/
│   ├── index.{js,cjs,d.ts}
│   └── style.css
├── hh-menu/
│   ├── index.{js,cjs,d.ts}
│   └── style.css
└── chunks/                       # 共享 chunk（自动 code-split）
```

## 开发

```bash
pnpm build         # 构建产物
pnpm dev           # 监听模式构建
pnpm lint          # 代码检查
pnpm typecheck     # 类型检查
pnpm clean         # 清理产物
```

## License

MIT © 立树
