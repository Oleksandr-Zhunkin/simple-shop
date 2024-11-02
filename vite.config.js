import { defineConfig } from "vite";
import staticCopy from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    staticCopy({
      targets: [
        {
          src: "public/*",
          dest: "",
        },
        {
          src: "js/*",
          dest: "js",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
  },
});
