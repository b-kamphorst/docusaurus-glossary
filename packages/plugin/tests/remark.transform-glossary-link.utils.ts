import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkTransformGlossaryLink from "../src/remark/transformers/transform-glossary-link";

export function run(
  md: string,
  { path = "./docs/page.md", options = {} } = {},
) {
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkTransformGlossaryLink, options)
    .use(remarkStringify)
    .process({ value: md, path })
    .then((file) => String(file));
}
