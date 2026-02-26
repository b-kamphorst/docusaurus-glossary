import fm from "front-matter";
import fs from "fs";
import path from "path";
import { normalizeGlossaryPath } from "./utils";

interface TermFrontmatter {
  /** If absent, we fall back to filename (without .md / .mdx) */
  id?: string;
  /** Required — no fallback is provided in code */
  title: string;
  /** If absent, we fall back to empty string */
  hoverText?: string;
}

export interface Term {
  path: string;
  title: string;
  hoverText: string;
  description: string;
}

export interface LoadTermsResult {
  terms: Term[];
}

export default function loadTerms(dir: string): LoadTermsResult {
  const files = fs.readdirSync(dir);

  const terms: Term[] = files
    .filter((f) => /\.mdx?$/.test(f) && !/^index\./.test(f))
    .map((f) => {
      const fullPath = path.join(dir, f);
      const source = fs.readFileSync(fullPath, "utf-8");
      const { attributes, body } = fm<TermFrontmatter>(source);

      return {
        path: normalizeGlossaryPath(f).replace(/\.mdx?/, ""),
        title: attributes.title,
        hoverText: attributes.hoverText || "",
        description: body.trim(),
      };
    });

  return { terms };
}
