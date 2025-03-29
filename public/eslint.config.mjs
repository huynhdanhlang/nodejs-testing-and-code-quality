import { defineConfig } from "eslint/config";
import globals from "globals";

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
