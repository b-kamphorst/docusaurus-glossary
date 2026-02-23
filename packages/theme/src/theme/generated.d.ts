import type { Term } from "@b-kamphorst/docusaurus-plugin-glossary";

declare module "@generated/*.json" {
  const value: Term[];
  export default value;
}
