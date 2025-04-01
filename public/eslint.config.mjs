const { defineConfig } = require("eslint/config");
const globals = require("globals");
// It is extended from root/eslint.config.mjs
export default defineConfig([
  {
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.jquery,
      },
    },

    rules: {
      "no-empty": "error",
      "no-multiple-empty-lines": "warn",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
]);
