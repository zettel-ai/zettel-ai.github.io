export function RiskReversalStrip() {
  const facts = [
    ["START", "Begin with a short audit request"],
    ["PRICE", "25% of verified credits"],
    ["RISK", "$0 recovered = $0 fee"],
  ] as const;

  return (
    <section aria-label="Launch offer" className="border-b border-outline-variant bg-background">
      <div className="mx-auto grid max-w-7xl divide-y divide-outline-variant px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-0">
        {facts.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3 py-4 sm:block sm:px-6 sm:py-5">
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-on-surface-variant">{label}</span>
            <span className="text-sm font-semibold text-on-background sm:mt-1 sm:block">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
