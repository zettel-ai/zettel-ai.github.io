"use client";

import { useEffect } from "react";

import { CALENDLY_URL } from "./RequestPilotButton";

type CalendlyWindow = Window & {
  Calendly?: { initBadgeWidget: (options: Record<string, unknown>) => void };
};

export function CalendlyBadge() {
  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled) return;
      // Avoid adding a second badge (e.g. on dev fast-refresh).
      if (document.querySelector(".calendly-badge-widget")) return;

      const w = window as CalendlyWindow;
      if (w.Calendly?.initBadgeWidget) {
        w.Calendly.initBadgeWidget({
          url: CALENDLY_URL,
          text: "Request a Pilot",
          color: "#006527",
          textColor: "#ffffff",
          branding: true,
        });
      } else {
        // widget.js is loaded async; retry until it is ready.
        setTimeout(init, 200);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
