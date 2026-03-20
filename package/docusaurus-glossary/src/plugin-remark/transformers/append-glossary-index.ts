import AST from "abstract-syntax-tree";
import { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { VFile } from "vfile";
import { getEscapedPathSep, specifyPath } from "../../utils";

const ePathSep = getEscapedPathSep();

export interface AppendGlossaryIndexOptions {
  glossaryPath: string; // Path to glossary directory.
}

export function transformerAppendGlossaryIndexFactory(
  options: AppendGlossaryIndexOptions,
) {
  const glossaryPath = specifyPath(options.glossaryPath);

  /**
   * Appends <GlossaryIndex /> to <glossaryPath>/index.md(x).
   */
  function transformerAppendGlossaryIndex(tree: Root, file: VFile) {
    const filePath = file.history?.[0] ?? "";

    const indexPathRegex = new RegExp(
      `${ePathSep}${glossaryPath}${ePathSep}index.mdx?$`,
    );
    const isGlossaryIndex = filePath.match(indexPathRegex);

    if (!isGlossaryIndex) {
      return;
    }

    // import GlossaryIndex component
    const GlossaryIndexImportStatement =
      "import GlossaryIndex from '@theme/GlossaryIndex';";
    tree.children.unshift({
      type: "mdxjsEsm",
      value: GlossaryIndexImportStatement,
      data: {
        estree: AST.parse(GlossaryIndexImportStatement),
      },
    });

    const glossaryIndexNode = buildGlossaryIndexNode();
    tree.children.push(glossaryIndexNode);
  }

  return transformerAppendGlossaryIndex;
}

/**
 * Build a MDX <GlossaryIndex> node.
 */
function buildGlossaryIndexNode(): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "GlossaryIndex",
    attributes: [],
    children: [],
  };
}
