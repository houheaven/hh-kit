
import hhEslintConfigHelper from "@houheaven/eslint-config-helper";

export default [
  {
    ignores: [
      ".agents/**",
      ".changeset/**",
      ".claude/**",
      ".stuff/**",
      ".trae/**",
      ".vscode/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/.turbo/**",
    ],
  },
  ...hhEslintConfigHelper.configs.es6,
  ...hhEslintConfigHelper.configs.typescript,
  ...hhEslintConfigHelper.configs.vue3Ts,
  ...hhEslintConfigHelper.configs.reactTsx,
];
