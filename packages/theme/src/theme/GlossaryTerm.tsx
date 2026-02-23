import type { Term } from "@b-kamphorst/docusaurus-plugin-glossary";
import Link from "@docusaurus/Link";
import Markdown from "react-markdown";

interface GlossaryTermProps {
  term: Term;
}

export default function GlossaryTerm({ term }: GlossaryTermProps) {
  return (
    <div className="container margin-vert--lg">
      <Link to="/glossary">Back to glossary.</Link>
      <h1>{term.title}</h1>
      <p>{term.hoverText}</p>
      <Markdown>{term.description}</Markdown>
    </div>
  );
}
