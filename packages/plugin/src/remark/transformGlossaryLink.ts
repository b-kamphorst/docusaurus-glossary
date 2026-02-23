import type { Link, Root, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxTextElement } from "mdast-util-mdx";
import type { Parent } from "unist";
import { visit, type Visitor } from "unist-util-visit";
import type { Term } from "../loadTerms.js";

export interface TransformGlossaryLinkOptions {
  glossaryPath?: string; // defaults to "/glossary"
}

/**
 * A minimal runtime glossary map.
 * Replace `Term` with a stronger type if you have a defined term shape.
 */
export type GlossaryMap = Record<string, Term>;

/**
 * Transform links from /<glossaryPath>/:id into:
 *   <GlossaryTooltip id=":id">...children...</GlossaryTooltip>
 */
export default function transformGlossaryLink(
  glossaryMap: GlossaryMap,
  options?: TransformGlossaryLinkOptions,
) {
  const glossaryPath = options?.glossaryPath ?? "/glossary";

  // Normalize: remove leading/trailing slashes
  const normalizedPath = glossaryPath.replace(/^\/|\/$/g, "");
  const prefix = `/${normalizedPath}/`;
  return function attacher() {
    return function transformer(tree: Root): void {
      const visitor: Visitor<Link> = (node, index, parent) => {
        if (parent == null || index == null) return;
        if (!node.url?.startsWith(prefix)) return;

        const termId = normalizeTermPath(
          node.url.replace(new RegExp(`^\\/${normalizedPath}\\/`), ""),
        );
        if (!glossaryMap[termId]) return;
        // TODO: optionally add warning/ throw error

        const mdxNode: MdxJsxTextElement = {
          type: "mdxJsxTextElement",
          name: "GlossaryTooltip",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "id",
              value: termId,
            } as MdxJsxAttribute,
          ],
          children: node.children,
        };

        // Replace the link node with our MDX JSX node
        (parent as Parent & { children: RootContent[] }).children[index] =
          mdxNode as unknown as RootContent;
      };

      visit(tree, "link", visitor);
    };
  };
}

export function normalizeTermPath(p: string) {
  return p.replace(/\.mdx?/, "");
}
