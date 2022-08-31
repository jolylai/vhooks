import { defineConfig } from "vite";
import path from "path";
import Demo from "./.vitepress/plugins/demo";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      usevhooks: path.join(process.cwd(), "src"),
    },
  },
  optimizeDeps: {
    include: ["ant-design-vue", "lodash"],
  },
  plugins: [
    Demo(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
