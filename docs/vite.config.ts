import { defineConfig } from "vite";
import path from "path";
import Demo from "./.vitepress/plugins/demo";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      usevhooks: path.join(process.cwd(), "src"),
    },
  },
  plugins: [Demo()],
});
