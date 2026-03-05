import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { mkdtemp, cp, rm } = fs.promises;

export type TempWorkspace = {
  dir: string;
  cleanup: () => Promise<void>;
};

export async function createTempWorkspace(
  prefix = "glossary-tests-",
): Promise<TempWorkspace> {
  const base = await mkdtemp(path.join(os.tmpdir(), prefix));
  return {
    dir: base,
    async cleanup() {
      // recursive cleanup; ignore errors on Windows locks
      try {
        await rm(base, { recursive: true, force: true });
      } catch {}
    },
  };
}

export async function copyFixtureDir(fixtureRelPath: string, destRoot: string) {
  const src = path.resolve(__dirname, "..", "fixtures", fixtureRelPath);
  const dest = path.join(destRoot, fixtureRelPath);
  await cp(src, dest, { recursive: true });
  return dest;
}
