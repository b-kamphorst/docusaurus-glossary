import type { Root } from "mdast";
import type { Plugin } from "unified";
import transformerAppendGlossaryIndex from "./appendGlossaryIndex";

const remarkGlossary: Plugin<[], Root> = () => {
  return (tree, file): void => {
    transformerAppendGlossaryIndex(tree, file);
  };
};

export default remarkGlossary;
