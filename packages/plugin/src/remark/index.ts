import type { Root } from "mdast";
import type { Plugin } from "unified";
import transformerAppendGlossaryIndexFactory from "./transformers/append-glossary-index";
import remarkTransformGlossaryLink from "./transformers/transform-glossary-link";

const remarkGlossary: Plugin<[], Root> = () => {
  const transformerAppendGlossaryIndex =
    transformerAppendGlossaryIndexFactory();
  const transformerTransformGlossaryLink = remarkTransformGlossaryLink();
  return (tree, file): void => {
    transformerAppendGlossaryIndex(tree, file);
    transformerTransformGlossaryLink(tree, file);
  };
};

export default remarkGlossary;
