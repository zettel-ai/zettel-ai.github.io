import { parcelSources } from "../_lib/content";

export function CaseFile() {
  return (
    <article aria-label="Example Zettel Parcel case file" className="relative overflow-hidden border border-outline-variant bg-white shadow-[0_24px_70px_-40px_rgba(27,28,28,0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-low px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="bg-on-background px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">Example case</span>
          <span className="font-mono text-xs text-on-surface-variant">CASE #0173</span>
        </div>
        <span className="border border-tertiary/30 bg-tertiary-fixed px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-on-tertiary-fixed-variant">Needs review</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.05fr_.95fr]">
        <div className="border-b border-outline-variant p-5 lg:border-b-0 lg:border-r lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">UPS Ground • 1Z84…</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-on-surface-variant">Amount challenged</p>
              <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-on-background">$47.75</p>
            </div>
            <span className="text-right text-xs text-on-surface-variant">Illustrative values<br />not a real recovery</span>
          </div>

          <div className="mt-6 border-t border-outline-variant pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Why Zettel flagged it</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <FactBlock label="Shipper-declared" value="48 × 6 × 6 in • 12.1 lb" note="Shipment record" />
              <FactBlock label="Carrier-assessed" value="49 × 7 × 7 in" note="Additional Handling • +$47.75" accent />
            </div>
          </div>

          <div className="mt-5 border border-tertiary/25 bg-tertiary-fixed/45 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-tertiary-fixed-variant">Rule in effect on shipment date</p>
            <p className="mt-2 text-sm font-medium text-on-background">Example rule reference • effective-date verification required</p>
            <a href={parcelSources.upsTerms.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-xs font-semibold text-tertiary hover:underline">
              View carrier terms source ↗
            </a>
          </div>
        </div>

        <div className="p-5 lg:p-6">
          <CaseRow label="Similar package profile" value="14 prior shipments • historical context, not proof" />
          <div className="mt-5 border-t border-outline-variant pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Evidence</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <EvidenceRow label="Original invoice" state="Available" />
              <EvidenceRow label="Shipment record" state="Available" />
              <EvidenceRow label="Applicable rule" state="Needs verification" neutral />
              <EvidenceRow label="Package photo" state="Missing evidence" missing />
            </ul>
          </div>

          <div className="mt-5 border-t border-outline-variant pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Recommended action</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-on-background">Review dimensional correction</p>
            <p className="mt-4 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary">Reviewable next action</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function FactBlock({ label, value, note, accent = false }: { label: string; value: string; note: string; accent?: boolean }) {
  return (
    <div className={`border p-3.5 ${accent ? "border-error/25 bg-error-container/25" : "border-outline-variant bg-surface-container-lowest"}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-on-surface-variant">{label}</p>
      <p className="mt-2 font-mono text-sm font-semibold text-on-background">{value}</p>
      <p className="mt-2 text-xs text-on-surface-variant">{note}</p>
    </div>
  );
}

function CaseRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-on-background">{value}</p>
    </div>
  );
}

function EvidenceRow({ label, state, missing = false, neutral = false }: { label: string; state: string; missing?: boolean; neutral?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-surface-container pb-2 last:border-0">
      <span className="text-on-background">{label}</span>
      <span className={`text-right text-xs font-semibold ${missing ? "text-error" : neutral ? "text-tertiary" : "text-primary"}`}>{state}</span>
    </li>
  );
}
