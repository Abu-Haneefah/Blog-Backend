// eslint.config.js

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        node: true,
      },
      parserOptions: {
        // Ensure ESLint knows about ES Modules
        sourceType: "module",
        ecmaVersion: 2022,
      },
    },
  },
  {
    // Specific rules for your TypeScript files
    files: ["**/*.ts"],
    rules: {
      // Add this rule or modify it if it already exists
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // Allows variables starting with an underscore to be unused
          varsIgnorePattern: "^_",
          // Allows arguments starting with an underscore to be unused
          argsIgnorePattern: "^_",
        },
      ],
    },
  }
);
