// 基础 ESLint 规则:TS + 通用规则
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
]
