import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default [
  {
    ignores: ["dist", "node_modules"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
      globals: { ...globals.node, ...globals.browser, ...globals.es2023 },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },

    rules: {
      "no-console": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  {
    files: ["example/**/*.tsx", "packages/**/*.tsx"],

    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, "packages/docusaurus-glossary/tsconfig.json"),
          path.join(__dirname, "example/tsconfig.json"),
          path.join(__dirname, "example-custom-glossary-path/tsconfig.json"),
        ],
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },

    rules: {
      // Type-aware TS rules
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
];
