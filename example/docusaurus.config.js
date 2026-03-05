"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var remark_1 = require("@b-kamphorst/docusaurus-glossary/remark");
var config = {
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
                    remarkPlugins: [remark_1.remarkGlossary],
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
            copyright: "Copyright \u00A9 ".concat(new Date().getFullYear(), " My Project, Inc. Built with Docusaurus."),
        },
    },
};
exports.default = config;
