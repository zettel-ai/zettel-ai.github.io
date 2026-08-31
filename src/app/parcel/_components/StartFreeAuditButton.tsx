"use client";

import type { MouseEvent, ReactNode } from "react";

import { trackParcelEvent } from "../_lib/analytics";
import { type AuditPlacement, useAuditIntake } from "./AuditIntakeProvider";

type Props = {
  placement: AuditPlacement;
  className?: string;
  children?: ReactNode;
};

export function StartFreeAuditButton({ placement, className = "", children }: Props) {
  const { openAudit } = useAuditIntake();

  return (
    <button
      type="button"
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        trackParcelEvent("parcel_cta_click", { placement });
        openAudit(placement, event.currentTarget);
      }}
    >
      {children ?? "Start a free audit"}
    </button>
  );
}
