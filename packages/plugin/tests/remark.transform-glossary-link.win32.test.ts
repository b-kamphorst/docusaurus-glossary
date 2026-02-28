import { jest } from "@jest/globals";
import * as actualUtils from "../src/utils";

describe("remarkTransformGlossaryLink", () => {
  test("handles files in windows", async () => {
    // Mock "getPathSep"
    jest.resetModules();
    jest.unstable_mockModule("../src/utils", () => {
      return {
        ...actualUtils,
        getPathSep: () => {
          return "\\";
        },
      };
    });

    // Load module under test dynamically to activate mock
    const { run } = await import("./remark.transform-glossary-link.utils");

    // Actual test
    const input = "[My term](./glossary/my-term)";
    const output = await run(input, { path: "\\docs\\page.md" });

    expect(output).toBeDefined();
  });
});
