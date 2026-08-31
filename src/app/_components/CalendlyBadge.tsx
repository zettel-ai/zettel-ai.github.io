"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { CALENDLY_URL } from "./RequestPilotButton";
import { loadCalendly, prewarmCalendly } from "./widgetLoaders";

type CalendlyWindow = Window & {
  Calendly?: { initBadgeWidget: (options: Record<string, unknown>) => void };
};

export function CalendlyBadge() {
  const pathname = usePathname();

  useEffect(() => {
    const existingBadge = document.querySelector(".calendly-badge-widget");
    if (pathname.startsWith("/parcel")) {
      existingBadge?.remove();
      return;
    }

    let cancelled = false;
    loadCalendly();

    const prewarmOnIntent = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.closest?.(".calendly-badge-widget")) {
        prewarmCalendly(CALENDLY_URL);
        document.removeEventListener("pointerover", prewarmOnIntent);
        document.removeEventListener("focusin", prewarmOnIntent);
      }
    };
    document.addEventListener("pointerover", prewarmOnIntent);
    document.addEventListener("focusin", prewarmOnIntent);

    function init() {
      if (cancelled) return;
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
        window.setTimeout(init, 200);
      }
    }

    init();
    return () => {
      cancelled = true;
      document.removeEventListener("pointerover", prewarmOnIntent);
      document.removeEventListener("focusin", prewarmOnIntent);
    };
  }, [pathname]);

  return null;
}
