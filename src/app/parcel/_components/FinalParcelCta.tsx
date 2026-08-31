import { StartFreeAuditButton } from "./StartFreeAuditButton";

export function FinalParcelCta() {
  return (
    <section className="bg-surface-container-lowest px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl border border-outline-variant bg-background p-7 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">A second look costs nothing upfront</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">Think your shipping bill deserves a second look?</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-on-surface-variant">Start with a few details. We’ll ask for one recent invoice in the follow-up and tell you whether there is enough evidence to review further.</p>
          </div>
          <StartFreeAuditButton placement="final" className="inline-flex h-12 cursor-pointer items-center justify-center bg-primary px-7 text-base font-semibold text-white hover:bg-on-primary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
        </div>
      </div>
    </section>
  );
}
