// Allow TS to compile imports from virtual @theme modules
declare module "@theme/*" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}

// Common Docusaurus imports used in themes
declare module "@docusaurus/Link" {
  import type { ComponentProps, ComponentType } from "react";

  interface LinkProps extends ComponentProps<"a"> {
    to: string;
  }

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module "@docusaurus/useDocusaurusContext" {
  export function useDocusaurusContext(): any;
}

declare module "@docusaurus/useGlobalData" {
  export function usePluginData<T = any>(pluginId: string): T;
}

declare module "@docusaurus/theme-common" {
  export function useThemeConfig(): any;
}

declare module "@theme-original/MDXComponents" {
  import type { ComponentType } from "react";
  const MDXComponents: ComponentType<any>;
  export default MDXComponents;
}

declare module "@docusaurus/Head" {
  import type { ComponentType } from "react";
  const Head: ComponentType<any>;
  export default Head;
}

declare module "@theme/MDXContent" {
  import type { ComponentType } from "react";
  const MDXContent: ComponentType<any>;
  export default MDXContent;
}

declare module "@theme/*" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
