import { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import path from "node:path";
import { VFile } from "vfile";

/**
 * Appends <GlossaryIndex /> to glossary/index.md
 */
export default function transformerAppendGlossaryIndex(
  tree: Root,
  file: VFile,
) {
  const filePath = file.history?.[0] ?? "";

  const indexPathRegex = new RegExp(
    `${path.sep}glossary${path.sep}index.mdx?$`,
  );
  const isGlossaryIndex = filePath.match(indexPathRegex);

  if (!isGlossaryIndex) {
    return;
  }

  const glossaryIndexNode: MdxJsxFlowElement = {
    type: "mdxJsxFlowElement",
    name: "GlossaryIndex",
    attributes: [],
    children: [],
  };

  tree.children.push(glossaryIndexNode);
}
