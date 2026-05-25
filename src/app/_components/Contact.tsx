"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { CALENDLY_URL } from "./RequestPilotButton";

const TALLY_EMBED_SRC =
  "https://tally.so/embed/NpRbO0?alignLeft=1&transparentBackground=1&dynamicHeight=1";

// Client-only flag without setState-in-effect; getServerSnapshot returns false
// so the Tally iframe is never server-rendered (it is mutated by Tally on load).
const subscribeNoop = () => () => {};

type ContactWindow = Window & {
  Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void };
  Tally?: { loadEmbeds: () => void };
};

export function Contact() {
  const calendlyRef = useRef<HTMLDivElement>(null);
  // Render the Tally iframe only on the client. Tally's script mutates the
  // iframe (src, id, styles) as soon as it loads, which would otherwise cause
  // a hydration mismatch against the server-rendered markup.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    function initCalendly() {
      if (cancelled) return;
      const el = calendlyRef.current;
      const w = window as ContactWindow;
      if (el && w.Calendly?.initInlineWidget) {
        if (!el.querySelector("iframe")) {
          w.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: el });
        }
      } else {
        setTimeout(initCalendly, 200);
      }
    }

    function initTally() {
      if (cancelled) return;
      const w = window as ContactWindow;
      if (w.Tally?.loadEmbeds) {
        w.Tally.loadEmbeds();
      } else {
        document
          .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
          .forEach((iframe) => {
            iframe.src = iframe.dataset.tallySrc ?? "";
          });
        setTimeout(initTally, 200);
      }
    }

    initCalendly();
    initTally();
    return () => {
      cancelled = true;
    };
  }, [mounted]);

  return (
    <section id="contact" className="border-t border-outline-variant bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Contact</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
            Talk to us about a pilot
          </h2>
          <p className="mt-5 text-lg leading-8 text-on-surface-variant">
            Book a 30-minute call, join the early-access list, or send us a note. We will walk
            through the workflow and figure out together how Zettel can help your team.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
              Book a 30-minute call
            </h3>
            <div
              ref={calendlyRef}
              className="overflow-hidden border border-outline-variant"
              style={{ minWidth: 320, height: 700 }}
            />
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
              Join the early-access list
            </h3>
            <div className="border border-outline-variant p-2">
              {mounted && (
                <iframe
                  data-tally-src={TALLY_EMBED_SRC}
                  loading="lazy"
                  width="100%"
                  height={986}
                  title="Early Access Form"
                  style={{ border: "none" }}
                />
              )}
            </div>
          </div>
        </div>

        <p className="mt-12 text-base leading-7 text-on-surface-variant">
          Prefer email? Reach us at{" "}
          <a
            className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            href="mailto:zettel.ops@gmail.com"
          >
            zettel.ops@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
