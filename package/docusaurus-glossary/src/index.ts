import { logger } from "@docusaurus/logger";
import type { LoadContext, Plugin } from "@docusaurus/types";
import fs from "fs";
import path from "path";
import loadTerms, {
  type LoadTermsResult,
} from "./plugin-docusaurus/load-terms";
import { getPathResolve, getPathSep } from "./utils.js";

export type { Term } from "./plugin-docusaurus/load-terms.js";
export { remarkGlossary } from "./plugin-remark";

const pathSep = getPathSep();
const pathResolve = getPathResolve();

const suggestedGlossaryIndex = `
---
title: Glossary
---

This glossary collects all our terms with a short description in a single overview. Click any term to view a more detailed description.

`;

/**
 * Options accepted by the plugin (from docusaurus.config.js)
 */
export interface GlossaryPluginOptions {
  /**
   * Path to the glossary directory relative to `siteDir`.
   * The glossary directory should be in the `docs.routeBasePath`.
   * Defaults to "docs/glossary".
   */
  path?: string;

  /**
   * Throw a build-time error if there exists no glossary index page.
   * If "false", display a build-time warning instead.
   * Defaults to "false".
   */
  throwOnMissingIndex?: boolean;
}

export default function glossaryPlugin(
  context: LoadContext,
  options?: GlossaryPluginOptions,
): Plugin<LoadTermsResult> {
  const { siteDir } = context;
  const throwOnMissingIndex = options?.throwOnMissingIndex ?? false;
  const glossaryPath = options?.path ?? path.join("docs", "glossary");
  const sanitizedGlossaryPath = glossaryPath
    .replace(/[\\|\/]+/g, pathSep)
    .replace(/^\//, "");
  const glossaryDir = pathResolve(siteDir, sanitizedGlossaryPath);

  return {
    name: "docusaurus-plugin-glossary",

    getThemePath() {
      return path.resolve(__dirname, "theme");
    },

    loadContent() {
      return loadTerms(glossaryDir);
    },

    async contentLoaded({ content, actions }) {
      // Expose terms data
      const { terms } = content;
      actions.setGlobalData(terms);

      // Ensure there is a glossary index
      if (
        !!terms &&
        !fs.existsSync(pathResolve(glossaryDir, "index.md")) &&
        !fs.existsSync(pathResolve(glossaryDir, "index.mdx"))
      ) {
        const missingIndexMsg = `Found terms defined in ${glossaryDir}, but that directory does not contain an index.md or index.mdx file. Please create an index. Our suggested index.md:\n\`\`\`${suggestedGlossaryIndex}\`\`\``;
        if (throwOnMissingIndex) {
          throw new Error(missingIndexMsg);
        } else {
          logger.warn(missingIndexMsg);
        }
      }
    },
  };
}
