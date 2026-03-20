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
  /**
   * The file path (without extension) of the term file.
   * Used as the primary identifier for lookups because the remark
   * transformer can only extract filenames from markdown links.
   * Fallback for routing if id is not provided.
   */
  path: string;

  /**
   * Optional custom identifier from frontmatter (id field).
   * Used for routing.
   */
  id?: string;

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

      return {
        path: normalizePath(f).replace(/\.mdx?/, ""),
        id: attributes.id,
        title: attributes.title,
        hoverText: attributes.hoverText || "",
        description: body.trim(),
      };
    });

  return { terms };
}
