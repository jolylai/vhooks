const path = require("path");

module.exports = {
  title: "Vue Hooks",
  description: "Just playing around.",
  // resolve: {
  //   alias: {
  //     usevhooks: path.resolve(__dirname, "../../src"),
  //   },
  // },
  themeConfig: {
    repo: "jolylai/vhooks",
    docsDir: "docs",

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
        { text: "useClickAway", link: "/hooks/dom/useClickAway" },
        { text: "useExternal", link: "/hooks/dom/useExternal" },
        { text: "useSize", link: "/hooks/dom/useSize" },
      ],
    },
    {
      text: "UI",
      children: [{ text: "useVirtualList", link: "/hooks/ui/useVirtualList" }],
    },
    {
      text: "State",
      children: [
        { text: "useBoolean", link: "/hooks/state/useBoolean" },
        { text: "useCounter", link: "/hooks/state/useCounter" },
      ],
    },
  ];
}
