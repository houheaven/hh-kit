
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
      "packages/kit-vue2/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/.turbo/**",
    ],
  },
  ...hhEslintConfigHelper.configs.es6,
  ...hhEslintConfigHelper.configs.typescript,
  ...hhEslintConfigHelper.configs.vue3Ts,
  ...hhEslintConfigHelper.configs.reactTsx,
  // {
  //   files: ["**/*.tsx", "**/*.ts"],
  //   rules: {
  //     "@typescript-eslint/naming-convention": [
  //       "error",
  //       {
  //         "selector": "property",
  //         "format": ["strictCamelCase", "StrictPascalCase"],
  //         "filter": {
  //           "regex": "^(@)$",
  //           "match": false,
  //         },
  //       },
  //     ],
  //   },
  // },
];
