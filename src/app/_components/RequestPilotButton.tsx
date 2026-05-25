"use client";

import type { ReactNode } from "react";

import { loadCalendly } from "./widgetLoaders";

export const CALENDLY_URL =
  "https://calendly.com/zettel-ops/30min?background_color=fbf9f8&text_color=1b1c1c&primary_color=006527";

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (options: { url: string }) => void };
};

type RequestPilotButtonProps = {
  className?: string;
  children: ReactNode;
};

export function RequestPilotButton({ className, children }: RequestPilotButtonProps) {
  return (
    <button
      type="button"
      aria-label="Request a Pilot — schedule a time to talk with us"
      className={className}
      onClick={() => {
        loadCalendly();
        // widget.js loads lazily; poll briefly until the popup API is ready.
        let tries = 0;
        const open = () => {
          const w = window as CalendlyWindow;
          if (w.Calendly?.initPopupWidget) {
            w.Calendly.initPopupWidget({ url: CALENDLY_URL });
          } else if (tries++ < 50) {
            window.setTimeout(open, 100);
          }
        };
        open();
      }}
    >
      {children}
    </button>
  );
}
