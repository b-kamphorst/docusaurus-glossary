import fm from "front-matter";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import { normalizeTermPath } from "./remark/transformGlossaryLink";

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
  title: string;
  hoverText: string;
  description: string;
  normalizedTermPath: string;
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
        id:
          attributes.id || slugify(f.replace(/\.mdx?$/, ""), { remove: /\W/g }),
        title: attributes.title,
        hoverText: attributes.hoverText || "",
        description: body.trim(),
        normalizedTermPath: normalizeTermPath(f),
      };
    });

  // TODO: fail if there are conflicting term ids
  return { terms };
}
