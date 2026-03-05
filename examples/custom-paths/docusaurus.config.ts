import { remarkGlossary } from "@b-kamphorst/docusaurus-glossary";
import type { Config } from "@docusaurus/types";

const docsPath = "docs";
const docsRouteBasePath = "/";
const glossaryPath = "/glossary-2";

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

  plugins: [
    [
      "@b-kamphorst/docusaurus-glossary",
      { path: `${docsPath}${docsRouteBasePath}${glossaryPath}` }, // path where the glossary will be **served**
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          path: docsPath,
          routeBasePath: docsRouteBasePath,
          remarkPlugins: [[remarkGlossary, { glossaryPath: glossaryPath }]],
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
