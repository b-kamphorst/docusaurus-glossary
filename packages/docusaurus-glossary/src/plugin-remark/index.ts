import type { Root } from "mdast";
import type { Plugin } from "unified";
import { DEFAULT_GLOSSARY_PATH } from "../constants";
import { transformerAppendGlossaryIndexFactory } from "./transformers/append-glossary-index";
import { remarkTransformGlossaryLink } from "./transformers/transform-glossary-link";

export interface RemarkGlossaryOptions {
  glossaryPath?: string; // Path to glossary directory. Defaults to "/glossary".
}

export const remarkGlossary: Plugin<[RemarkGlossaryOptions], Root> = (
  options = {},
) => {
  const opts = { glossaryPath: DEFAULT_GLOSSARY_PATH, ...options };
  const transformerAppendGlossaryIndex =
    transformerAppendGlossaryIndexFactory(opts);
  const transformerTransformGlossaryLink = remarkTransformGlossaryLink(opts);
  return (tree, file): void => {
    transformerAppendGlossaryIndex(tree, file);
    transformerTransformGlossaryLink(tree, file);
  };
};
