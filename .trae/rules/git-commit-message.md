---
alwaysApply: true
scene: git_message
author: 立树
version: 2.1.0
updated: 2026-10-23
---

# AI 生成提交信息的规则

- 提交信息使用中文；type 和 scope 使用下文定义的英文标识。
- 生成提交信息前，先检查本次改动的文件和主要目的，再按下面的分类规则选择一个 type。


# AI 生成提交信息的格式

```
<type>[(<scope>)]: <subject>

<body>
```

规则：
- scope 默认可省略；`docs` 必须填写 scope，`build` 必须省略 scope。
- `docs` 的 scope 使用改动文件直接所在的文件夹名称；根目录文件使用 `root`。例如：`docs/ci/workflow.md` 的 scope 为 `ci`。
- `chore` 的 scope 可选；填写时使用所有相关改动共有的顶层目录名。只有根目录文件时使用 `root`；涉及多个不同顶层目录时省略 scope。
- `ci` 的 scope 可选，优先使用 CI 平台或工作流名称，例如 `github-actions`。
- `build` 不使用 scope。依赖或构建配置变更的 subject 说明具体内容，例如 `build: 固定 Changesets CLI 为 3.0.3`。
- 仅实际发布版本时使用 `build: vX.Y.Z`，版本号使用本次发布的版本号；这是 subject 不包含中文的唯一例外。
- 除版本发布提交外，subject 必须包含中文。中文与英文、中文与数字之间加一个空格，例如“修复 API 接口”“升级到 v2 版本”。
- body 必须填写，使用中文；路径、命令和代码标识符可保留原文。subject 与 body 之间空一行。
- 如果涉及多个文件或多项改动，body 使用编号列表，按逻辑变更归纳相关文件；每个列表项各占一行，列表项之间不得有空行；只有单项改动时，用一句话概括。
- 一次提交只包含一个完整目的；提交前检查暂存区的文件和内容。
- 一个 commit 涉及多个类别时，按主要目的选择一个 type；无法判断主要目的时，先询问用户。

示例：

```text
ci(github-actions): 添加 GitHub Actions 工作流

1. 新增工作流配置文件，定义推送时的触发条件。
2. 添加构建任务并执行项目检查。
```


# type 分类规则

- `feat`：新增面向用户或项目使用者的能力。
- `fix`：修复现有功能的问题。
- `refactor`：重构实现，不改变外部行为。
- `test`：新增或调整测试。
- `ci`：CI/CD 流程和自动化配置，例如 `.github/workflows/**`。
- `build`：构建依赖或项目版本配置，例如 `package.json`、`pnpm-lock.yaml`；依赖变更说明具体内容，版本发布使用 `build: vX.Y.Z`。
- `docs`：文档内容，例如 `docs/**`；scope 使用文件直接所在文件夹名称。
- `chore`：不属于以上类型的仓库维护、工具或元数据配置，例如 `.vitepress/**`、`.trae/**`、`.ai/**`、`AGENTS.md`、`.gitignore`。
- 未被路径示例覆盖时，优先按改动目的选择 `feat`、`fix`、`refactor` 或 `test`；纯维护性改动使用 `chore`。
