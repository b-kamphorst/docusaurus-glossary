import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { Term } from "..";

export default function GlossaryIndex() {
  const sortedTerms = getTerms();
  return sortedTerms.map((t) => (
    <ul>
      <li>
        <Link to={t.id}>
          <b>{t.title}:</b>
        </Link>
        &nbsp;{t.hoverText}
      </li>
    </ul>
  ));
}

// Module-level cache
let sortedTerms: Term[] | null = null;

function getTerms(): Term[] {
  if (!sortedTerms) {
    const terms: Term[] =
      usePluginData<Term[]>("docusaurus-plugin-glossary") || [];
    sortedTerms = [...terms].sort((a, b) => a.title.localeCompare(b.title));
  }
  return sortedTerms;
}
