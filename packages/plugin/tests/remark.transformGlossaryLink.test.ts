import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import transformGlossaryLink, {
  type GlossaryMap,
} from "../src/remark/transformGlossaryLink.js";

const defaultGlossaryMap: GlossaryMap = {
  foo: {
    id: "foo",
    title: "Foo",
    hoverText: "My foo.",
    description: "My longer foo.",
    normalizedTermPath: "foo",
  },
};

function run(
  md: string,
  { glossaryMap = defaultGlossaryMap, options = {} } = {},
) {
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(transformGlossaryLink(glossaryMap, options))
    .use(remarkStringify)
    .process(md)
    .then((file) => String(file));
}

describe("transformGlossaryLinks", () => {
  it("rewrites extension-less glossary link", async () => {
    const input = "[Foo](/glossary/foo)";

    const output = await run(input);
    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip id="foo">Foo</GlossaryTooltip>
"
`);
  });

  it("rewrites .md-extension glossary link", async () => {
    const input = "[Foo](/glossary/foo.md)";

    const output = await run(input);
    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip id="foo">Foo</GlossaryTooltip>
"
`);
  });

  it("rewrites .mdx-extension glossary link", async () => {
    const input = "[Foo](/glossary/foo.mdx)";

    const output = await run(input);
    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip id="foo">Foo</GlossaryTooltip>
"
`);
  });

  it("ignores non-glossary link", async () => {
    const input = "[Baz](/docs/baz)";

    const output = await run(input);
    expect(output).toMatchInlineSnapshot(`
"[Baz](/docs/baz)
"
`);
  });

  it("respects custom glossaryPath options", async () => {
    const input = "[Foo](/terms/foo.mdx)";

    const output = await run(input, { options: { glossaryPath: "/terms" } });
    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip id="foo">Foo</GlossaryTooltip>
"
`);
  });
});
