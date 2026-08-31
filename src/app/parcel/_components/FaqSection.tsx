"use client";

import { faqItems } from "../_lib/content";
import { trackParcelEvent } from "../_lib/analytics";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-outline-variant bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.6fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">What happens before the first audit?</h2>
        </div>
        <div className="border-t border-outline-variant">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-b border-outline-variant"
              onToggle={(event) => {
                if (event.currentTarget.open) trackParcelEvent("parcel_faq_expand", { item: item.question });
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold text-on-background focus-visible:outline-2 focus-visible:outline-primary sm:text-lg">
                <span>{item.question}</span>
                <span aria-hidden="true" className="material-symbols-outlined text-primary transition-transform group-open:rotate-45">add</span>
              </summary>
              <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-on-surface-variant sm:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
