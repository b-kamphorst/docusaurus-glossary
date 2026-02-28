import path from "path";
import { DEFAULT_GLOSSARY_PATH } from "./constants";

const pathsep = getPathSep();

/**
 * Turn the configured glossaryPath into a platform-specific file path.
 * E.g. on windows, the glossaryPath "/my/glossary" becomes "\my\glossary".
 * Leading and trailing slashes are removed.
 * @param glossaryPath
 * @returns
 */
export function specifyGlossaryPath(glossaryPath: string | undefined): string {
  return (glossaryPath ?? DEFAULT_GLOSSARY_PATH)
    .replace(/^[\/\\]|[\/\\]$/, "")
    .replace(/\/|\\/g, pathsep);
}

export function normalizeGlossaryPath(
  glossaryPath: string | undefined,
): string {
  return specifyGlossaryPath(glossaryPath).replaceAll(pathsep, "/");
}

// Returns path.sep. Layer of indirection to allow mocking.
export function getPathSep() {
  return path.sep;
}
