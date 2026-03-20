import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import {
  transformerAppendGlossaryIndexFactory,
  type AppendGlossaryIndexOptions,
} from "../src/plugin-remark/transformers/append-glossary-index";

export function run(
  md: string,
  {
    path = "./docs/glossary/index.md",
    options = { glossaryPath: "/glossary" },
  }: { path?: string; options?: AppendGlossaryIndexOptions } = {},
) {
  const transformer = transformerAppendGlossaryIndexFactory(options);
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(() => transformer)
    .use(remarkStringify)
    .process({ value: md, path })
    .then((file) => String(file));
}
