import { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import path from "node:path";
import { VFile } from "vfile";
import { specifyGlossaryPath } from "../../utils";

export interface AppendGlossaryIndexOptions {
  glossaryPath?: string; // defaults to "/glossary"
}

export default function transformerAppendGlossaryIndexFactory(
  options: AppendGlossaryIndexOptions = {},
) {
  const glossaryPath = specifyGlossaryPath(options.glossaryPath);

  /**
   * Appends <GlossaryIndex /> to <glossaryPath>/index.md(x).
   */
  function transformerAppendGlossaryIndex(tree: Root, file: VFile) {
    const filePath = file.history?.[0] ?? "";

    const indexPathRegex = new RegExp(
      `${path.sep}${glossaryPath}${path.sep}index.mdx?$`,
    );
    const isGlossaryIndex = filePath.match(indexPathRegex);

    if (!isGlossaryIndex) {
      return;
    }

    const glossaryIndexNode = buildGlossaryTooltipNode();
    tree.children.push(glossaryIndexNode);
  }

  return transformerAppendGlossaryIndex;
}

/**
 * Build a MDX <GlossaryIndex> node.
 */
function buildGlossaryTooltipNode(): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "GlossaryIndex",
    attributes: [],
    children: [],
  };
}
