import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export const baseConfig = [
  {
    ignores: ["dist/**", ".next/**", "node_modules/**", "**/eslint.config.*"],
  },
  js.configs.recommended,
  prettier,
];

export const tsConfig = defineConfig([
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
  },
]);

export const tsStrictConfig = defineConfig([
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    rules: {
      // Type rules
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Style rules
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "space-infix-ops": "error",
      "max-len": [
        "warn",
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],

      // Console control
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
]);
