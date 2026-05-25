"use client";

import type { ReactNode } from "react";

const CALENDLY_URL =
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
        (window as CalendlyWindow).Calendly?.initPopupWidget({ url: CALENDLY_URL });
      }}
    >
      {children}
    </button>
  );
}
