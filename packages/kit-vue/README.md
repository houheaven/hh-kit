# @houheaven/kit-vue

后天堂 Vue 3 组件套件，提供开箱即用的通用组件，支持按需引入与自动样式加载。

## 特性

- **Vue 3 + TypeScript**：完整类型定义，模板中即得类型提示。
- **子路径导出**：每个组件独立入口，按需引用不引入无关代码。
- **CSS 自动注入**：无需手动 import 样式文件，构建时自动加载。
- **双格式产物**：同时输出 ESM (`.js`) 与 CJS (`.cjs`)，兼容 Vite / Webpack / Rollup 等主流构建工具。
- **Tree-shaking 友好**：`sideEffects` 精确声明，未使用的组件不进入产物。

## 安装

```bash
pnpm add @houheaven/kit-vue
# 或
npm install @houheaven/kit-vue
# 或
yarn add @houheaven/kit-vue
```

`vue >= 3` 为 peer 依赖，请在项目中自行安装。

## 使用

### 按需引入（推荐）

引入组件时无需手动导入 CSS，构建产物已自动注入。

```vue
<script setup lang="ts">
  import hhFooter from "@houheaven/kit-vue/hh-footer";
  import hhImageDialog from "@houheaven/kit-vue/hh-image-dialog";
</script>

<template>
  <hh-footer :groups="groups" copyright="© 2026 houheaven" />
  <hh-image-dialog v-model="visible" :image="qrcode" text="扫码关注" />
</template>
```

### 全量引入

```ts
import { hhFooter, hhImageDialog } from "@houheaven/kit-vue";
```

## 组件

### hh-footer

页脚组件，支持自定义分组导航和版权信息。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| groups | `FooterGroup[]` | `[]` | 自定义分组导航 |
| copyright | `string` | `""` | 版权文字 |

**示例**

```vue
<script setup lang="ts">
  import hhFooter from "@houheaven/kit-vue/hh-footer";
  import type { FooterGroup } from "@houheaven/kit-assets/data/hh-footer-types";

  const groups: FooterGroup[] = [
    {
      title: "产品",
      links: [
        { label: "官网", href: "https://example.com" },
      ],
    },
  ];
</script>

<template>
  <hh-footer :groups="groups" copyright="© 2026 houheaven" />
</template>
```

### hh-image-dialog

图片弹窗组件，用于展示二维码等图片。使用 `v-model` 控制显示，点击遮罩或按 ESC 键关闭。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| image | `string` | — | 图片地址（必填） |
| text | `string` | `""` | 图片下方说明文字 |

**v-model**

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| modelValue | `boolean` | 弹窗显隐状态 |

**示例**

```vue
<script setup lang="ts">
  import { ref } from "vue";
  import hhImageDialog from "@houheaven/kit-vue/hh-image-dialog";

  const visible = ref(false);
</script>

<template>
  <button @click="visible = true">显示图片</button>
  <hh-image-dialog v-model="visible" image="/path/to/qrcode.jpg" text="扫码关注" />
</template>
```

## 产物结构

```
dist/
├── index.{js,cjs,d.ts}          # 全量桶入口
├── hh-footer/
│   ├── index.{js,cjs,d.ts}      # 子入口
│   └── style.css                # 独立样式
├── hh-image-dialog/
│   ├── index.{js,cjs,d.ts}
│   └── style.css
└── chunks/                       # 共享 chunk（自动 code-split）
```

## 开发

```bash
pnpm build         # 构建产物
pnpm dev           # 监听模式构建
pnpm typecheck     # 类型检查
pnpm clean         # 清理产物
```

## License

MIT © 立树
