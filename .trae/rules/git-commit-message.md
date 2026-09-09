---
alwaysApply: true
scene: git_message
---

# AI 生成提交信息的规则

- 语言为中文


# AI 生成提交信息的格式

```
<type>(<scope>): <subject>

<body>
```

说明：
- 当 type 为 docs 时，scope 必须有值，scope 为所在文件夹的名称。
- 当 type 为 chore 时，scope 可选。如果有值，scope 为改动文件所属的顶层文件夹名称。
    - 示例1：改动 .vitepress/config.ts 则 scope 为 .vitepress。
    - 示例2：改动 .trae/rules/git-commit-message.md 则 scope 为 .trae。
- 当 type 为 build 时，subject 为当前 package.json 中的版本号（例如：build: v1.0.0）。
- subject 不能是纯英文。
- 中文与英文、中文与数字之间必须加一个空格（例如：修复 API 接口、升级到 v2 版本）。
- body 部分：如果涉及多个文件或多项改动，使用编号列表逐条说明每项变更内容；如果只有单项改动，可以用一句话概括。


# type 分类规则

- build：package.json、pnpm-lock.yaml
- chore：.vitepress/**、.trae/**、.gitignore
- docs：docs/**
