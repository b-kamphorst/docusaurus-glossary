import { usePluginData } from "@docusaurus/useGlobalData";
import React from "react";
import type { Term } from "../";
import { TOOLTIP_ID } from "../constants.js";

interface GlossaryTooltipProps {
  termId: string;
  children: React.ReactNode; // content inside the tooltip/link
}

export default function GlossaryTooltip({
  termId,
  children,
}: GlossaryTooltipProps) {
  const termMap = getTermMap();
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

// Module-level cache
let termMap: Record<string, Term> | null = null;

function getTermMap(): Record<string, Term> {
  if (!termMap) {
    const terms: Term[] =
      usePluginData<Term[]>("docusaurus-plugin-glossary") || [];
    termMap = Object.fromEntries(terms.map((t) => [t.path, t]));
  }
  return termMap;
}
