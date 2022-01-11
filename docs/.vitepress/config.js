const path = require("path");

module.exports = {
  title: "Vue Hooks",
  description: "Just playing around.",
  themeConfig: {
    repo: "jolylai/vhooks",
    docsDir: "../",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [
      {
        text: "hooks",
        link: "/hooks/state/useBoolean",
        activeMatch: "^/$|^/hooks/",
      },
    ],

    sidebar: {
      "/hooks/": getHooksSidebar(),
    },
  },
};

function getHooksSidebar() {
  return [
    {
      text: "useRequest",
      children: [
        { text: "基础用法", link: "/hooks/useRequest/basic/" },
        { text: "轮询", link: "/hooks/useRequest/polling/" },
        { text: "Loading Delay", link: "/hooks/useRequest/loadingDelay/" },
        { text: "缓存", link: "/hooks/useRequest/cache/" },
      ],
    },
    {
      text: "Dom",
      children: [
        { text: "useClickAway", link: "/hooks/useClickAway" },
        { text: "useExternal", link: "/hooks/useExternal" },
        { text: "useFavicon", link: "/hooks/useFavicon" },
        { text: "useInViewport", link: "/hooks/useInViewport" },
        { text: "useEventListener", link: "/hooks/useEventListener" },
        { text: "useSize", link: "/hooks/useSize" },
        { text: "useHover", link: "/hooks/useHover" },
        { text: "useMouse", link: "/hooks/useMouse" },
        { text: "useScroll", link: "/hooks/useScroll" },
      ],
    },
    {
      text: "UI",
      children: [{ text: "useVirtualList", link: "/hooks/useVirtualList" }],
    },
    {
      text: "State",
      children: [
        { text: "useBoolean", link: "/hooks/useBoolean" },
        { text: "useCounter", link: "/hooks/useCounter" },
      ],
    },
  ];
}
