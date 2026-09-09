# Changesets

本目录由 [changesets](https://github.com/changesets/changesets) 管理,用于跟踪包版本变更。

## 常用命令

- 新增变更:`pnpm changeset`
- 应用版本:`pnpm changeset version`
- 发布到 npm:`pnpm release`

## 发布策略

- 仅 `@houheaven/kit-vue` 和 `@houheaven/kit-react` 会被发布到 npm。
- 其他 `packages/*` 与 `configs/*` 均为 `"private": true` 内部包,changesets 自动跳过。
- 版本策略:Independent(两个对外包独立版本号)。
