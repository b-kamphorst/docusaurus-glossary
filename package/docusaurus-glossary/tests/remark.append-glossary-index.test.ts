import { run } from "./remark.append-glossary-index.utils";

describe("transformerAppendGlossaryIndex", () => {
  test("appends GlossaryIndex and import to the glossary index file", async () => {
    const output = await run("# Glossary");

    expect(output).toMatchInlineSnapshot(`
"import GlossaryIndex from '@theme/GlossaryIndex';

# Glossary

<GlossaryIndex />
"
`);
  });

  test("does nothing to non-glossary-index files", async () => {
    const output = await run("# Some page", { path: "./docs/another-page.md" });

    expect(output).toMatchInlineSnapshot(`
"# Some page
"
`);
  });

  test("does nothing to glossary term files", async () => {
    const output = await run("# My Term", {
      path: "./docs/glossary/my-term.md",
    });

    expect(output).toMatchInlineSnapshot(`
"# My Term
"
`);
  });

  test("respects a custom glossary path", async () => {
    const output = await run("# Glossary", {
      path: "./docs/terminology/index.md",
      options: { glossaryPath: "/terminology" },
    });

    expect(output).toMatchInlineSnapshot(`
"import GlossaryIndex from '@theme/GlossaryIndex';

# Glossary

<GlossaryIndex />
"
`);
  });
});
