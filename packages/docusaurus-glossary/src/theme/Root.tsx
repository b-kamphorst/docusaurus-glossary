import type { PropsWithChildren, ReactElement } from "react";
import { Tooltip } from "react-tooltip";
import { TOOLTIP_ID } from "../constants.js";

export default function Root({
  children,
}: PropsWithChildren<unknown>): ReactElement {
  return (
    <>
      {children}
      <Tooltip id={TOOLTIP_ID} />
    </>
  );
}
