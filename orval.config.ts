import { defineConfig } from "orval";

export default defineConfig({
  testmaker: {
    output: {
      mode: "tags-split",
      target: "src/api/endpoints/testmaker.ts",
      schemas: "src/api/model",
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "./src/lib/httpClient.ts",
          name: "restClient",
        },
      },
    },
    input: {
      target: "./testmaker.yaml",
    },
    hooks: {
      afterAllFilesWrite: "pnpm lint-fix-orval",
    },
  },
});
