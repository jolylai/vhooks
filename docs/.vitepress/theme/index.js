import DefaultTheme from "vitepress/theme";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(antd);
  },
};
