import { parcelCopy } from "../_lib/content";
import { StartFreeAuditButton } from "./StartFreeAuditButton";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 border-b border-outline-variant bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Simple pricing</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.045em] text-on-background sm:text-6xl">{parcelCopy.pricingHeadline}</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-on-surface-variant">No setup fee. No monthly platform fee for the managed launch service. The fee is calculated only after recovery is verified.</p>
          <StartFreeAuditButton placement="pricing" className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center bg-primary px-7 text-base font-semibold text-white hover:bg-on-primary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
        </div>
        <div className="border-y border-outline-variant bg-white">
          <div className="grid grid-cols-2 gap-4 border-b border-outline-variant px-5 py-4 font-mono text-xs uppercase tracking-[0.1em] text-on-surface-variant sm:px-7"><span>Example recovery</span><span className="text-right">Amount</span></div>
          <PriceRow label="Carrier credit posted" amount="$1,000" />
          <PriceRow label="Zettel fee • 25%" amount="$250" />
          <PriceRow label="You keep" amount="$750" strong />
          <div className="grid gap-2 border-t border-outline-variant px-5 py-5 text-sm sm:grid-cols-3 sm:px-7">
            {parcelCopy.pricingFacts.map((fact) => <span key={fact} className="font-semibold text-on-background">{fact}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceRow({ label, amount, strong = false }: { label: string; amount: string; strong?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-4 border-b border-outline-variant px-5 py-5 sm:px-7 ${strong ? "bg-primary-fixed/30" : ""}`}>
      <span className={strong ? "font-semibold text-on-background" : "text-on-surface-variant"}>{label}</span>
      <span className={`text-right font-mono ${strong ? "text-xl font-semibold text-primary" : "text-base font-semibold text-on-background"}`}>{amount}</span>
    </div>
  );
}
