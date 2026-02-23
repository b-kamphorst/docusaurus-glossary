import type { Term } from "@b-kamphorst/docusaurus-plugin-glossary";
import Link from "@docusaurus/Link";
import React from "react";

interface GlossaryIndexProps {
  glossary: Term[];
  indexPreamble?: React.ComponentType<any>;
}

export default function GlossaryIndex({
  glossary,
  indexPreamble,
}: GlossaryIndexProps) {
  const IndexPreamble = indexPreamble; // JSX tags must start with uppercase letter
  const sorted = [...glossary].sort((a, b) => a.title.localeCompare(b.title));
  console.log(IndexPreamble);
  return (
    <div className="container margin-vert--lg">
      {(IndexPreamble && React.createElement(IndexPreamble)) || (
        <h1>Glossary</h1>
      )}
      <ul>
        {sorted.map((t) => (
          <li key={t.id}>
            <Link to={`/glossary/${t.normalizedTermPath}`}>{t.title}</Link>
            <p>{t.hoverText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
