# 开发指南

## 快速开始

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 启动 Vue 演示站点
pnpm --filter demo-vue dev

# 启动 React 演示站点
pnpm --filter demo-react dev

# 类型检查
pnpm typecheck

# 代码风格检查
pnpm lint
```

## 发布流程

仓库使用 [Changesets](https://github.com/changesets/changesets) 管理版本与变更日志。

```bash
# 1. 记录一次变更
pnpm changeset

# 2. 汇总 changeset,更新 package.json 版本与 CHANGELOG
pnpm version-packages

# 3. 构建并发布至 npm
pnpm release
```
