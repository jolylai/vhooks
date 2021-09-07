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
      text: "Dom",
      children: [
        { text: "useClickAway", link: "/hooks/useClickAway" },
        { text: "useExternal", link: "/hooks/useExternal" },
        { text: "useFavicon", link: "/hooks/useFavicon" },
        { text: "useInViewport", link: "/hooks/useInViewport" },
        { text: "useEventListener", link: "/hooks/useEventListener" },
        { text: "useSize", link: "/hooks/useSize" },
        { text: "useHover", link: "/hooks/useHover" },
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
