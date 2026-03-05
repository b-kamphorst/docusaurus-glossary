import path from "path";

const pathSep = getPathSep();
const ePathSep = getEscapedPathSep();

/**
 * Turn the provided path into a platform-specific file path.
 * E.g. on windows, the path "/my/glossary" becomes "my\glossary".
 * Leading and trailing slashes are removed.
 * @param p
 * @returns
 */
export function specifyPath(p: string): string {
  return p.replace(/^[\/\\]|[\/\\]$/, "").replace(/\/|\\/g, ePathSep);
}

export function normalizePath(glossaryPath: string): string {
  return specifyPath(glossaryPath).replaceAll(pathSep, "/");
}

// Returns path.sep. Layer of indirection to allow mocking.
export function getPathSep() {
  return path.sep;
}

// Returns escaped path.sep
export function getEscapedPathSep() {
  return "\\" + getPathSep();
}

// Returns path.resolve(). Layer of indirection to allow mocking.
export function getPathResolve() {
  return path.resolve;
}
