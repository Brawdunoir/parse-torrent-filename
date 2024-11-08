import globals from "globals";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/no-commonjs": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/extensions": ["error", "ignorePackages"],
    },
  },
  pluginJs.configs.recommended,
];
