
import hhEslintConfigHelper from "@houheaven/eslint-config-helper";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".turbo/**",
    ],
  },
  ...hhEslintConfigHelper.configs.es6,
  ...hhEslintConfigHelper.configs.typescript,
  ...hhEslintConfigHelper.configs.vue2Ts,
];
