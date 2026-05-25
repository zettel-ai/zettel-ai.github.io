"use client";

import type { ReactNode } from "react";

import { loadTally, prewarmTally } from "./widgetLoaders";

const TALLY_FORM_ID = "NpRbO0";

type TallyWindow = Window & {
  Tally?: { openPopup: (formId: string, options?: Record<string, unknown>) => void };
};

type JoinEarlyAccessButtonProps = {
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

// Opens the Tally early-access form in a modal. Prewarms the Tally script on
// hover/focus/pointer-down so the popup is ready by click time, and polls for
// the API on click so even a first instant tap opens reliably.
export function JoinEarlyAccessButton({ className, ariaLabel, children }: JoinEarlyAccessButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onPointerEnter={prewarmTally}
      onFocus={prewarmTally}
      onPointerDown={prewarmTally}
      onClick={() => {
        loadTally();
        let tries = 0;
        const open = () => {
          const w = window as TallyWindow;
          if (w.Tally?.openPopup) {
            w.Tally.openPopup(TALLY_FORM_ID, {
              layout: "modal",
              autoClose: 1000,
              formEventsForwarding: true,
            });
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
