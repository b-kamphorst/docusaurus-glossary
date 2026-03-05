import loadTerms from "../src/plugin-docusaurus/load-terms.js";
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

    const { terms } = loadTerms(glossaryDir);

    expect(terms).toMatchSnapshot();
  });
});
