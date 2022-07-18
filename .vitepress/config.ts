import { defineConfig } from "vitepress";
// const demoPlugin = require("./plugins/demo");

export default defineConfig({
  title: "Vue Hooks",
  description: "Just playing around.",
  locales: {},
  // markdown: {
  //   config: (md) => {
  //     demoPlugin(md);
  //   },
  // },
  themeConfig: {
    nav: [
      {
        text: "hooks",
        link: "/hooks/useBoolean/",
        activeMatch: "/hooks/",
      },
    ],

    sidebar: {
      "/hooks/": getHooksSidebar(),
    },
  },
});

function getHooksSidebar() {
  return [
    {
      text: "useRequest",
      items: [
        { text: "基础用法", link: "/hooks/useRequest/docs/basic/" },
        { text: "轮询", link: "/hooks/useRequest/docs/polling/" },
        { text: "Loading Delay", link: "/hooks/useRequest/docs/loadingDelay/" },
        { text: "依赖刷新", link: "/hooks/useRequest/docs/refreshDeps/" },
        {
          text: "屏幕聚焦重新请求",
          link: "/hooks/useRequest/docs/refreshOnWindowFocus/",
        },
        { text: "防抖", link: "/hooks/useRequest/docs/debounce/" },
        { text: "缓存", link: "/hooks/useRequest/docs/cache/" },
      ],
    },
    {
      text: "Dom",
      items: [
        { text: "useEventListener", link: "/hooks/useEventListener/" },
        { text: "useClickAway", link: "/hooks/useClickAway/" },
        {
          text: "useDocumentVisibility",
          link: "/hooks/useDocumentVisibility/",
        },
        { text: "useDrag & useDrop", link: "/hooks/useDrop/" },
        { text: "useExternal", link: "/hooks/useExternal/" },
        { text: "useFavicon", link: "/hooks/useFavicon/" },
        { text: "useInViewport", link: "/hooks/useInViewport/" },
        { text: "useSize", link: "/hooks/useSize/" },
        { text: "useHover", link: "/hooks/useHover/" },
        { text: "useMouse", link: "/hooks/useMouse/" },
        { text: "useScroll", link: "/hooks/useScroll/" },
      ],
    },
    {
      text: "Scene",
      items: [
        { text: "useVirtualList", link: "/hooks/useVirtualList/" },
        { text: "useCountDown", link: "/hooks/useCountDown/" },
      ],
    },
    {
      text: "State",
      items: [
        { text: "useBoolean", link: "/hooks/useBoolean/" },
        { text: "useCounter", link: "/hooks/useCounter/" },
      ],
    },
  ];
}
