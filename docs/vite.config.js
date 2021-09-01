import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      usevhooks: path.resolve(__dirname, "../src"),
      "@": path.resolve(__dirname, "../"),
    },
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
