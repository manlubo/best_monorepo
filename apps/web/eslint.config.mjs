import { tsConfig } from "@best-mono/config/eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [...tsConfig, nextPlugin.configs["core-web-vitals"]];
