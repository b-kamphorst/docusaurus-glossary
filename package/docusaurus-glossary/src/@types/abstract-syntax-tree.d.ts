declare module "abstract-syntax-tree" {
  import { Program } from "estree";

  export interface ParseOptions {
    module?: boolean;
    next?: boolean;
    loc?: boolean;
    ranges?: boolean;
    [key: string]: unknown;
  }

  export function parse(source: string, options?: ParseOptions): Program;
}
