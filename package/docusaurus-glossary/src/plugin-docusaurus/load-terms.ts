import { logger } from "@docusaurus/logger";
import fm from "front-matter";
import fs from "fs";
import path from "path";
import { normalizePath } from "../utils";

interface TermFrontmatter {
  /** If absent, we fall back to filename (without .md / .mdx) */
  id?: string;
  /** Required — no fallback is provided in code */
  title: string;
  /** If absent, we fall back to empty string */
  hoverText?: string;
}

export interface Term {
  id: string;
  path: string;
  title: string;
  hoverText: string;
  description: string;
}

export interface LoadTermsResult {
  terms: Term[];
}

export default function loadTerms(dir: string): LoadTermsResult {
  if (!fs.existsSync(dir)) {
    logger.warn(`Failed to find configured glossary directory '${dir}'`);
    return { terms: [] };
  }
  const files = fs.readdirSync(dir);
  const terms: Term[] = files
    .filter((f) => /\.mdx?$/.test(f) && !/^index\./.test(f))
    .map((f) => {
      const fullPath = path.join(dir, f);
      const source = fs.readFileSync(fullPath, "utf-8");
      const { attributes, body } = fm<TermFrontmatter>(source);

      const normalizedPath = normalizePath(f).replace(/\.mdx?/, "");
      return {
        id: attributes.id || normalizedPath,
        path: normalizedPath,
        title: attributes.title,
        hoverText: attributes.hoverText || "",
        description: body.trim(),
      };
    });

  return { terms };
}
