import AST from "abstract-syntax-tree";
import type { Link, Root, RootContent } from "mdast";
import type { MdxJsxTextElement } from "mdast-util-mdx";
import type { Parent } from "unist";
import { visit, type Visitor } from "unist-util-visit";
import { VFile } from "vfile";
import {
  getEscapedPathSep,
  getPathResolve,
  getPathSep,
  specifyPath,
} from "../../utils.js";

const pathSep = getPathSep();
const ePathSep = getEscapedPathSep();
const pathResolve = getPathResolve();

export interface TransformGlossaryLinkOptions {
  glossaryPath: string; // Path to glossary directory.
}

/**
 * A minimal runtime glossary map.
 * Replace `Term` with a stronger type if you have a defined term shape.
 */
// export type GlossaryMap = Record<string, Term>;

export function remarkTransformGlossaryLink(
  options: TransformGlossaryLinkOptions,
) {
  const specifiedGlossaryPath = specifyPath(options.glossaryPath);
  const prefix = `${specifiedGlossaryPath}${ePathSep}`;

  /**
   * Transform links from /<glossaryPath>/:id into:
   *   <GlossaryTooltip termId=":id">...children...</GlossaryTooltip>
   *
   * The import for GlossaryTooltip is only injected when at least one link
   * is actually transformed, so files with no glossary links are left clean.
   */
  return (tree: Root, file: VFile) => {
    let transformed = false;
    const visitor: Visitor<Link> = (node, index, parent) => {
      if (parent == null || index == null || node.url == null) return;

      let resolvedUrl;
      if (node.url.startsWith(".")) {
        // For relative links, resolve them relative to the directory of the current file.
        // file.history[0] contains the file path; get its directory.
        const filePath = file.history?.[0] ?? file.path ?? ".";
        const fileDir =
          filePath.split(pathSep).slice(0, -1).join(pathSep) || ".";
        resolvedUrl = pathResolve(fileDir, node.url);
      } else {
        resolvedUrl = pathSep + node.url.split("/").join(pathSep);
      }
      // Choice: we only consider links to files directly in <glossaryPath>, not to subdirectories thereof.
      const acceptedLinkRegex = new RegExp(
        `^(?:(?!${ePathSep}${prefix}).)*${ePathSep}${prefix}([^${ePathSep}]+?)(\.mdx?)?$`,
      );
      const matchedTermPath = resolvedUrl.match(acceptedLinkRegex);
      if (!matchedTermPath) return;

      const termPath = matchedTermPath[1];
      const tooltipNode = buildGlossaryTooltipNode(termPath, node);
      (parent as Parent & { children: RootContent[] }).children[index] =
        tooltipNode as unknown as RootContent;
      transformed = true;
    };

    visit(tree, "link", visitor);

    if (transformed) {
      const GlossaryTooltipImportStatement =
        "import GlossaryTooltip from '@theme/GlossaryTooltip';";
      tree.children.unshift({
        type: "mdxjsEsm",
        value: GlossaryTooltipImportStatement,
        data: {
          estree: AST.parse(GlossaryTooltipImportStatement),
        },
      });
    }
  };
}

/**
 * Build a MDX <ToolTip> node.
 */
function buildGlossaryTooltipNode(
  termId: string,
  node: Link,
): MdxJsxTextElement {
  return {
    type: "mdxJsxTextElement",
    name: "GlossaryTooltip",
    attributes: [{ type: "mdxJsxAttribute", name: "termId", value: termId }],
    children: [node],
  };
}
