import { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { VFile } from "vfile";
import { getPathSep, specifyGlossaryPath } from "../../utils";

const pathsep = getPathSep();
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
      `${pathsep}${glossaryPath}${pathsep}index.mdx?$`,
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
