# 📘 Docusaurus Glossary

A Docusaurus plugin and theme for creating a glossary of terms from Markdown files in your documentation site.

This project provides a plugin plus accompanying theme that let you define terms in Markdown, automatically process references to those terms, and generate a structured glossary page in your Docusaurus site. It makes it easier for readers to discover and understand important terminology in your documentation.

![Demo of resulting glossary and tooltips](https://github.com/b-kamphorst/docusaurus-glossary/raw/refs/tags/v0.2.1/static/demo.gif)

## 🚀 Features

This package will:

- collect glossary terms from a directory (`docs/glossary`) of Markdown files;
- find links to those glossary terms throughout your docs and put them in `Term` components;
- add a `Glossary` component to `glossary/index.md` that will automatically list and sort all discovered terms;
- render the above components using the supplied theme;
- allow you to override (swizzle) this theme if you like.

Notably, this plugin will keep source files intact. All transformations are performed on the docusaurus AST during build by leveraging the remark plugin system.

## Installation

To install the plugin to your Docusaurus repository, use the command:

```bash
npm install @b-kamphorst/docusaurus-glossary
```

Then add the plugin to `docusaurus.config.js` file of your project:

```js
import { remarkGlossary } from "@b-kamphorst/docusaurus-glossary";

module.exports = {
  // ...
  plugins: ['@b-kamphorst/docusaurus-glossary']

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          remarkPlugins: [remarkGlossary],
        },
        // ...
      }
    ],
  ]
}
```

Or, if you need to customize the plugin configuration:

```js
// in module.exports
plugins: [
  '@b-kamphorst/docusaurus-glossary',
  {
    // docusaurus plugin options
  }
]

// in module.exports.presets."classic".docs
remarkPlugins: [
  remarkGlossary, {
    // remark plugin options
  }
],
```

## Usage

Build and leverage your own glossary in three simple steps.

### 1. Define a Term

For every term that you want to refer to, create a markdown file (`.md`, `.mdx`) in the glossary directory. By default, this directory is `docs/glossary`. For example:

`docs/glossary/my-term.md`

```md
---
title: My term
hoverText: Short description shows when hovering over links to 'My term'.
---

Long description will be shown on the dedicated My Term page.
```

### 2. Initiate a glossary

This step can be as simple as creating an empty file `docs/glossary/index.md`. It will suffice, and render into a list of all your terms on `http://my-website/glossary`. However, you can add a preamble or custom header if you like:

```md
---
title: Glossary
---

This glossary collects all our terms with a short description in a single overview. Click any term to view a more detailed description.
```

### 3. Refer to a term

In any markdown file under `docs/` (including the glossary terms themselves), just link to a term file like you usually do when you refer to another page ([relative and with extension](https://docusaurus.io/docs/markdown-features/links)):

`docs/index.md`

```md
---
title: Introduction
---

Welcome to my website! Some hard terms like ["my term"](glossary/my-term.md) will be used, but we define them properly for your convenience!
```

## Options

This plugin can be customized by providing the options outlined below. An example project that alters the glossary and docs directories can be found in this plugin's repository.

### Docusaurus plugin options

| Option                | Type      | Default         | Description                                                                       |
| --------------------- | --------- | --------------- | --------------------------------------------------------------------------------- |
| `path`                | `string`  | `docs/glossary` | Path to the glossary directory relative to `siteDir`. Should be in the docs path. |
| `throwOnMissingIndex` | `boolean` | `false`         | Throw a build-time error if there exists no glossary index page.                  |

### Remark plugin options

| Option         | Type     | Default    | Description                                         |
| -------------- | -------- | ---------- | --------------------------------------------------- |
| `glossaryPath` | `string` | `glossary` | Path to glossary directory relative to `docs.path`. |

## Acknowledgements

This plugin was inspired by [`grnet`'s docusaurus-terminology](https://github.com/grnet/docusaurus-terminology).
