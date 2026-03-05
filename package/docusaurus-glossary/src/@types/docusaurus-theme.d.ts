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

declare module "@docusaurus/useGlobalData" {
  export function usePluginData<T = any>(pluginId: string): T;
}
