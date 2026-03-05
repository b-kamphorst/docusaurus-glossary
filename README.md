# 📘 Docusaurus Glossary

A Docusaurus plugin and theme for creating a glossary of terms from Markdown files in your documentation site.

This project provides a plugin plus accompanying theme that let you define terms in Markdown, automatically process references to those terms, and generate a structured glossary page in your Docusaurus site. It makes it easier for readers to discover and understand important terminology in your documentation.

For more information on the plugin itself, have a look at [the plugin readme](./package/docusaurus-glossary/README.md).

## Structure

This repo contains a npm workspace with two main "package":

- [`./examples`](./examples/) contains example docusaurus projects to showcase and test usage of the plugin.
- [`./package/docusaurus-glossary`](./package/docusaurus-glossary/) contains the source code of the plugin.

## 🛠 Development

To install the development environment:

```bash
npm run install
```

To lint and type check:

```bash
npm run validate
```

To perform package tests:

```bash
npm test
```

To test the examples:

```bash
npm run example:start
# or
npm run example2:start
```

To pack/ publish:

```bash
npm pack -w package/docusaurus-glossary
# or
npm publish -w package/docusaurus-glossary
```

## 🤝 Contributing

Issues and pull requests are welcome.
