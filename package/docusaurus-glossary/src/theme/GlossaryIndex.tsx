import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { useMemo } from "react";
import type { Term } from "..";

export default function GlossaryIndex() {
  const terms: Term[] =
    usePluginData<Term[]>("docusaurus-plugin-glossary") || [];
  const sortedTerms = useMemo(
    () => [...terms].sort((a, b) => a.title.localeCompare(b.title)),
    [terms],
  );
  return (
    <ul>
      {sortedTerms.map((t) => (
        <li key={t.id || t.path}>
          <Link to={t.id || t.path}>
            <b>{t.title}:</b>
          </Link>
          &nbsp;{t.hoverText}
        </li>
      ))}
    </ul>
  );
}
