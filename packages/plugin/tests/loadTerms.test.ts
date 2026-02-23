import path from "path";
import loadTerms from "../src/loadTerms.js";
import {
  copyFixtureDir,
  createTempWorkspace,
  type TempWorkspace,
} from "./helpers/fs.js";

describe("loadTerms()", () => {
  let ws: TempWorkspace;

  beforeEach(async () => (ws = await createTempWorkspace()));

  afterEach(async () => await ws.cleanup());

  it("parses terms and index file from fixture directory", async () => {
    const glossaryDir = await copyFixtureDir("glossary", ws.dir);

    const { terms, indexContentPath } = loadTerms(glossaryDir);

    expect(terms.map((t) => t.id).sort()).toEqual(
      ["bar", "foo", "slugme"].sort(),
    );
    expect(indexContentPath && path.basename(indexContentPath)).toBe(
      "index.md",
    );

    expect(terms).toMatchSnapshot();
  });
});
