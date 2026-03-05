/** @jest-config-loader ts-node */
import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/examples", "<rootDir>/package"],
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "mjs", "cjs", "json"],

  // Use SWC for TS/JS
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  clearMocks: true,
  verbose: true,
};

export default config;
