import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: "src/lib/index.ts",
  ignore: ["taze.config.ts"],
  ignoreDependencies: ["taze"],
  ignoreBinaries: ["lint", "typecheck"],
  vite: {
    config: "vite.config.ts",
  },
};

export default config;
