"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";

import { AuditIntakeDialog } from "./AuditIntakeDialog";
import { trackParcelEvent } from "../_lib/analytics";

export type AuditPlacement = "nav" | "hero" | "pricing" | "final";

type AuditIntakeContextValue = {
  openAudit: (placement: AuditPlacement, opener?: HTMLElement | null) => void;
};

const AuditIntakeContext = createContext<AuditIntakeContextValue | null>(null);

export function AuditIntakeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<AuditPlacement>("hero");
  const openerRef = useRef<HTMLElement | null>(null);

  const value = useMemo<AuditIntakeContextValue>(
    () => ({
      openAudit(nextPlacement, opener) {
        openerRef.current = opener ?? null;
        setPlacement(nextPlacement);
        setOpen(true);
        trackParcelEvent("parcel_intake_open", { placement: nextPlacement });
      },
    }),
    [],
  );

  return (
    <AuditIntakeContext.Provider value={value}>
      {children}
      <AuditIntakeDialog
        open={open}
        placement={placement}
        onClose={() => {
          setOpen(false);
          window.setTimeout(() => openerRef.current?.focus(), 0);
        }}
      />
    </AuditIntakeContext.Provider>
  );
}

export function useAuditIntake() {
  const value = useContext(AuditIntakeContext);
  if (!value) throw new Error("useAuditIntake must be used inside AuditIntakeProvider");
  return value;
}
