import type { LoadContext, Plugin } from "@docusaurus/types";
import fs from "fs";
import path from "path";
import loadTerms, { type LoadTermsResult } from "./loadTerms.js";
export type { Term } from "./loadTerms.js";

/**
 * Options accepted by the plugin (from docusaurus.config.js)
 */
export interface GlossaryPluginOptions {
  /**
   * Relative path (from siteDir) to the glossary directory.
   * Defaults to "glossary"
   */
  path?: string;

  /**
   * Base route for the glossary pages.
   * Defaults to "/"
   */
  routeBasePath?: string;
}

export default function glossaryPlugin(
  context: LoadContext,
  options: GlossaryPluginOptions,
): Plugin<LoadTermsResult> {
  const { siteDir, baseUrl } = context;
  const glossaryPath = options.path ?? "glossary";
  const glossaryDir = path.resolve(siteDir, glossaryPath);
  const routeBasePath = options.routeBasePath ?? "/";
  const fullGlossaryRoute = `${baseUrl}/${routeBasePath}/${glossaryPath}`
    .replace(/\/+/g, "\/")
    .replace(/\/$/, "");

  return {
    name: "docusaurus-plugin-glossary",

    loadContent() {
      return loadTerms(glossaryDir);
    },

    async contentLoaded({ content, actions }) {
      const { terms, indexPreamblePath } = content;
      const { addRoute, createData } = actions;

      const glossaryData = await createData(
        "glossary.json",
        JSON.stringify(terms),
      );

      const glossaryIndexModules: Record<string, string> = {
        glossary: glossaryData,
      };

      if (indexPreamblePath) {
        const glossaryIndexPreamble = await createData(
          "glossaryIndex.mdx",
          fs.readFileSync(indexPreamblePath, "utf-8"),
        );
        glossaryIndexModules["indexPreamble"] = glossaryIndexPreamble;
      }

      addRoute({
        path: `${fullGlossaryRoute}`,
        exact: true,
        component: "@theme/GlossaryIndex",
        modules: glossaryIndexModules,
      });

      for (const term of terms) {
        addRoute({
          path: `${fullGlossaryRoute}/${term.normalizedTermPath}`,
          component: "@theme/GlossaryTerm",
          modules: {
            term: await createData(`${term.id}.json`, JSON.stringify(term)),
          },
        });
      }
    },
  };
}
