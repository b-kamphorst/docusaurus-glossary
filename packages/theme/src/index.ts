import path from "path";

export default function glossaryTheme() {
  return {
    name: "docusaurus-theme-glossary",

    getThemePath() {
      return path.resolve(__dirname, "theme");
    },
  };
}
