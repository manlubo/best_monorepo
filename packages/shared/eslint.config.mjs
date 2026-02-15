import { tsStrictConfig } from "@best-mono/config/eslint";

export default [
  ...tsStrictConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
