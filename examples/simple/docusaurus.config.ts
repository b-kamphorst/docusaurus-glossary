import { remarkGlossary } from "@b-kamphorst/docusaurus-glossary";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "Example Site",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/custom-base-url/",

  onBrokenLinks: "throw",
  markdown: { hooks: { onBrokenMarkdownLinks: "throw" } },

  plugins: ["@b-kamphorst/docusaurus-glossary"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          remarkPlugins: [remarkGlossary],
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      respectPrefersColorScheme: true,
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
};

export default config;
