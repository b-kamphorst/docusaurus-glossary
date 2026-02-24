import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { Term } from "./types";

export default function GlossaryIndex() {
  const glossaryData =
    usePluginData<Term[]>("docusaurus-plugin-glossary") || [];

  const sorted = [...glossaryData].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  return sorted.map((t) => (
    <ul>
      <li>
        <Link to={`/glossary/${t.normalizedTermPath}`}>
          <b>{t.title}:</b>
        </Link>
        &nbsp; {t.hoverText}
      </li>
    </ul>
  ));
}
