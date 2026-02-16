import { tsStrictConfig } from "@best-mono/config/eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  ...tsStrictConfig,
  nextPlugin.configs["core-web-vitals"],
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
    },
  },
];
