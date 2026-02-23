import type * as Preset from "@docusaurus/preset-classic";
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

  plugins: ["@b-kamphorst/docusaurus-plugin-glossary"],
  themes: ["@b-kamphorst/docusaurus-theme-glossary"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
        },
      } satisfies Preset.Options,
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
  } satisfies Preset.ThemeConfig,
};

export default config;
