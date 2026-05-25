"use client";

import { useEffect } from "react";

import { CALENDLY_URL } from "./RequestPilotButton";
import { loadCalendly, loadTally } from "./widgetLoaders";

type CalendlyWindow = Window & {
  Calendly?: { initBadgeWidget: (options: Record<string, unknown>) => void };
};

export function CalendlyBadge() {
  useEffect(() => {
    let cancelled = false;

    // Calendly powers this always-visible badge and the Request-a-Pilot
    // buttons site-wide, so load it as soon as we hydrate.
    loadCalendly();
    // Tally only backs the early-access modal/form; defer it past first paint.
    const tallyTimer = window.setTimeout(loadTally, 1500);

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
          branding: false,
        });
      } else {
        // widget.js is loaded async; retry until it is ready.
        setTimeout(init, 200);
      }
    }

    init();
    return () => {
      cancelled = true;
      window.clearTimeout(tallyTimer);
    };
  }, []);

  return null;
}
