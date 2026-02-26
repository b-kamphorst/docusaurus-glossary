import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkTransformGlossaryLink from "../src/remark/transformers/transform-glossary-link";

function run(md: string, { path = "/docs/page.md", options = {} } = {}) {
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkTransformGlossaryLink, options)
    .use(remarkStringify)
    .process({ value: md, path })
    .then((file) => String(file));
}

describe("remarkTransformGlossaryLink", () => {
  test("transforms absolute links starting with '/'", async () => {
    const input = "[My term](/glossary/my-term)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("transforms absolute links not starting with '/'", async () => {
    const input = "[My term](glossary/my-term)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("ignores .md extensions in links", async () => {
    const input = "[My term](../glossary/my-term.md)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("ignores .mdx extensions in links", async () => {
    const input = "[My term](../glossary/my-term.mdx)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("transforms relative links (./) that resolve to glossary/", async () => {
    const input = "[My term](./glossary/my-term)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("transforms relative links (../) that resolve to glossary/", async () => {
    const input = "[My term](../glossary/my-term)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("allows glossary items to refer to each other", async () => {
    const input = "[My term](./my-term.md)";

    const output = await run(input, {
      path: "/docs/glossary/my-other-term.md",
    });

    expect(output).toMatchInlineSnapshot(`\n"${input}\n"\n`);
  });

  test("ignores relative links that do not resolve to glossary/", async () => {
    const input = "[My term](./terms/my-term)";

    const output = await run(input, { path: "/docs/somewhere/page.md" });

    expect(output).toMatchInlineSnapshot(`\n"${input}\n"\n`);
  });

  test("ignores absolute links to non-glossary routes", async () => {
    const input = "[My term](terms-faker/my-term)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`\n"${input}\n"\n`);
  });

  test("ignores relative links that resolve to subdirectories of glossary/", async () => {
    const input = "[My term](./glossary/glossary/my-term)";

    const output = await run(input, { path: "/docs/page.md" });

    expect(output).toMatchInlineSnapshot(`\n"${input}\n"\n`);
  });

  test("ignores absolute links that resolve to subdirectories of glossary/", async () => {
    const input = "[My term](glossary/glossary/my-term)";

    const output = await run(input);

    expect(output).toMatchInlineSnapshot(`\n"${input}\n"\n`);
  });

  test("transforms relative links that resolve to x-glossary/glossary/", async () => {
    const input = "[My term](./glossary/my-term)";

    const output = await run(input, { path: "/x-glossary/docs/page.md" });

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("transforms relative links that resolve to glossary-x/glossary/", async () => {
    const input = "[My term](./glossary/my-term)";

    const output = await run(input, { path: "/glossary-x/docs/page.md" });

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("respects different glossaryDirs", async () => {
    const input = "[My term](terms/my-term)";

    const output = await run(input, { options: { glossaryPath: "/terms" } });

    expect(output).toMatchInlineSnapshot(`
"<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });
});
