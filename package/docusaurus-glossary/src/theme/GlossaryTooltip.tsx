import { usePluginData } from "@docusaurus/useGlobalData";
import React, { useMemo } from "react";
import type { Term } from "..";
import { TOOLTIP_ID } from "../constants.js";

interface GlossaryTooltipProps {
  termId: string;
  children: React.ReactNode; // content inside the tooltip/link
}

export default function GlossaryTooltip({
  termId,
  children,
}: GlossaryTooltipProps) {
  const terms: Term[] =
    usePluginData<Term[]>("docusaurus-plugin-glossary") || [];
  // Support lookup by both filename-derived path and optional frontmatter id.
  // This lets tooltip resolution work for links expressed with either key.
  const termMap = useMemo(() => {
    const map: Record<string, Term> = {};
    for (const t of terms) {
      map[t.path] = t;
      if (t.id) {
        map[t.id] = t;
      }
    }
    return map;
  }, [terms]);
  const term = termMap[termId];
  if (!term) {
    console.warn(`Glossary term '${termId}' is not recognized.`);
    return children;
  }

  const hoverText = termMap[termId].hoverText;
  return (
    <span data-tooltip-id={TOOLTIP_ID} data-tooltip-content={hoverText}>
      {children}
    </span>
  );
}
