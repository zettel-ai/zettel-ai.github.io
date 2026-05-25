"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { CALENDLY_URL } from "./RequestPilotButton";
import { loadCalendly, loadTally } from "./widgetLoaders";

const TALLY_EMBED_SRC =
  "https://tally.so/embed/NpRbO0?alignLeft=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1";

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

    // This page hosts both embeds, so make sure their scripts are requested.
    loadCalendly();
    loadTally();

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
      <div className="mx-auto max-w-4xl px-6">
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

        <div className="mt-14 space-y-16">
          <div id="request-pilot">
            <h3 className="text-2xl font-semibold tracking-tight text-on-background">
              Book a 30-minute call
            </h3>
            <p className="mt-2 text-base leading-7 text-on-surface-variant">
              Pick a time that works for you and we will walk through your workflow live.
            </p>
            <div
              ref={calendlyRef}
              className="mt-6 w-full min-w-0 overflow-hidden border border-outline-variant"
              // Cap the embed so it never fills the viewport: a full-height
              // Calendly iframe captures wheel/touch scrolling and leaves no
              // page area to scroll past it, trapping users before the footer.
              // 80svh keeps ~20% of the screen as scrollable "escape room";
              // 760px keeps the scheduler comfortable on tall screens.
              style={{ width: "100%", height: "min(760px, 80svh)" }}
            />
          </div>

          <div id="early-access" className="border-t border-outline-variant pt-16">
            <h3 className="text-2xl font-semibold tracking-tight text-on-background">
              Join the early-access list
            </h3>
            <p className="mt-2 text-base leading-7 text-on-surface-variant">
              Not ready to talk yet? Leave your details and we will keep you posted.
            </p>
            <div className="mt-6 border border-outline-variant p-2">
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

          <div className="border-t border-outline-variant pt-16">
            <h3 className="text-2xl font-semibold tracking-tight text-on-background">
              Prefer email?
            </h3>
            <p className="mt-2 text-base leading-7 text-on-surface-variant">
              Send us a note directly and we will get back to you within a business day.
            </p>
            <div className="mt-6 flex flex-col items-center border border-outline-variant bg-surface-container-lowest px-6 py-10 text-center">
              <span className="material-symbols-outlined text-[40px] text-primary" aria-hidden="true">
                mail
              </span>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-on-surface-variant">
                Email us at
              </p>
              <a
                className="mt-2 text-2xl font-semibold tracking-tight text-primary hover:underline md:text-3xl"
                href="mailto:zettel.ops@gmail.com"
              >
                zettel.ops@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
