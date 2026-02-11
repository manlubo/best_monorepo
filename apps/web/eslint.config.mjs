import { tsConfig } from "../../packages/config/eslint/index.mjs";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  ...tsConfig,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];
