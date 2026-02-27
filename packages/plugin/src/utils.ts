import path from "path";
import { DEFAULT_GLOSSARY_PATH } from "./constants";

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
    .replace(/\/|\\/g, path.sep);
}

export function normalizeGlossaryPath(
  glossaryPath: string | undefined,
): string {
  return specifyGlossaryPath(glossaryPath).replaceAll(path.sep, "/");
}
