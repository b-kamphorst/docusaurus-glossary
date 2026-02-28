import type { Link, Root, RootContent } from "mdast";
import type { MdxJsxTextElement } from "mdast-util-mdx";
import path from "path";
import type { Parent } from "unist";
import { visit, type Visitor } from "unist-util-visit";
import { VFile } from "vfile";
import {
  getEscapedPathSep,
  getPathSep,
  specifyGlossaryPath,
} from "../../utils.js";

const pathSep = getPathSep();
const ePathSep = getEscapedPathSep();

export interface TransformGlossaryLinkOptions {
  glossaryPath?: string; // defaults to "/glossary"
}

/**
 * A minimal runtime glossary map.
 * Replace `Term` with a stronger type if you have a defined term shape.
 */
// export type GlossaryMap = Record<string, Term>;

export default function remarkTransformGlossaryLink(
  options?: TransformGlossaryLinkOptions,
) {
  const specifiedGlossaryPath = specifyGlossaryPath(options?.glossaryPath);
  const prefix = `${specifiedGlossaryPath}${pathSep}`;

  /**
   * Transform links from /<glossaryPath>/:id into:
   *   <GlossaryTooltip termId=":id">...children...</GlossaryTooltip>
   */
  return (tree: Root, file: VFile) => {
    const visitor: Visitor<Link> = (node, index, parent) => {
      if (parent == null || index == null || node.url == null) return;

      var resolvedUrl;
      if (node.url.startsWith(".")) {
        resolvedUrl = path.resolve(file.cwd, ...node.url.split("/"));
      } else {
        resolvedUrl = "/" + node.url.split("/").join(pathSep);
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
    };

    visit(tree, "link", visitor);
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
