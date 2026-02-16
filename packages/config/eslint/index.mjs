import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monoRoot = path.resolve(__dirname, "../../../");

export const baseConfig = [
  {
    ignores: ["dist/**", ".next/**", "node_modules/**", "**/eslint.config.*"],
  },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  prettier,
];

export const tsStrictConfig = defineConfig([
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      "import/no-unresolved": "off",

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

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: path.join(monoRoot, "apps/api"),
              from: path.join(monoRoot, "apps/web"),
            },
            {
              target: path.join(monoRoot, "apps/web"),
              from: path.join(monoRoot, "apps/api"),
            },
            {
              target: path.join(monoRoot, "packages"),
              from: path.join(monoRoot, "apps"),
            },
          ],
        },
      ],
    },
  },
]);
