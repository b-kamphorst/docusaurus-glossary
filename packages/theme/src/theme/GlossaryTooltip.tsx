import Link from "@docusaurus/Link";
import React from "react";

// export default function GlossaryTooltip({
//   id,
//   children,
// }: GlossaryTooltipProps) {
//   return (
//     <span title={map[id]} style={{ borderBottom: "1px dotted" }}>
//       {/* <Link to={`/glossary/${id}`}>{children}</Link> */}
//       {children}
//     </span>
//   );
// }

interface GlossaryTooltipProps {
  id: string; // Term id
  children: React.ReactNode; // content inside the tooltip/link
  hoverMap: Record<string, string>; // Map from term id -> hover text, passed by plugin
  routeBasePath?: string; // optional base path for glossary pages
}

export default function GlossaryTooltip({
  id,
  children,
  hoverMap,
  routeBasePath = "glossary",
}: GlossaryTooltipProps) {
  const hoverText = hoverMap[id];

  return (
    <span
      title={hoverText}
      style={{ borderBottom: "1px dotted", cursor: "help" }}
    >
      <Link to={`/${routeBasePath}/${id}`}>{children}</Link>
      {children}
    </span>
  );
}
