module.exports = {
  title: "Vue Hooks",
  description: "Just playing around.",
  themeConfig: {
    // repo: "vuejs/vitepress",
    docsDir: "docs",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [
      {
        text: "hooks",
        link: "/hooks/useBoolean",
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
      children: [{ text: "useClickAway", link: "/hooks/dom/useClickAway" }],
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
