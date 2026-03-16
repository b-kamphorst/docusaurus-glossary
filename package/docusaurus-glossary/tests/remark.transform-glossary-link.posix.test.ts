import { jest } from "@jest/globals";
import path from "path";
import * as actualUtils from "../src/utils";

describe("remarkTransformGlossaryLink", () => {
  beforeAll(() => {
    // Mock "getPathResolve" and "getPathSep"
    jest.resetModules();
    jest.unstable_mockModule("../src/utils", () => {
      const pathPlatform = path.posix;
      return {
        ...actualUtils,
        getPathResolve: () => {
          return (...paths: string[]) => {
            return pathPlatform.resolve(...paths);
          };
        },
        getPathSep: () => {
          return pathPlatform.sep;
        },
        getEscapedPathSep: () => {
          return "\\" + pathPlatform.sep;
        },
      };
    });
  });

  test("handles absolute references in posix", async () => {
    // Load module under test dynamically to activate mock
    const { run } = await import("./remark.transform-glossary-link.utils");
    // Actual test
    const input = "[My term](glossary/my-term)";
    const output = await run(input, { path: "./docs/page.md" });

    expect(output).toMatchInlineSnapshot(`
"import GlossaryTooltip from '@theme/GlossaryTooltip';

<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });

  test("handles relative references in posix", async () => {
    // Load module under test dynamically to activate mock
    const { run } = await import("./remark.transform-glossary-link.utils");
    // Actual test
    const input = "[My term](./glossary/my-term)";
    const output = await run(input, { path: "./docs/page.md" });

    expect(output).toMatchInlineSnapshot(`
"import GlossaryTooltip from '@theme/GlossaryTooltip';

<GlossaryTooltip termId="my-term">${input}</GlossaryTooltip>
"
`);
  });
});
