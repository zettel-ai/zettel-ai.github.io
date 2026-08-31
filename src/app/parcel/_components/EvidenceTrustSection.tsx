const cards = [
  ["Evidence you can trace", "See the billing record, shipment fact, rule source, or evidence behind a recommendation instead of only a score."],
  ["Time matters", "Rules, guarantees, rates, agreements, and source facts can change. The case keeps the effective context attached."],
  ["Missing evidence stays missing", "If the evidence isn't there, Zettel says so. Unknown, contradictory, and degraded states remain visible."],
] as const;

export function EvidenceTrustSection() {
  return (
    <section className="border-b border-outline-variant bg-surface-container-lowest px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tertiary">No black-box savings score</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">Every flagged charge comes with the reason.</h2>
        </div>
        <div className="mt-12 grid gap-px bg-outline-variant md:grid-cols-3">
          {cards.map(([title, body]) => (
            <article key={title} className="bg-white p-6 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-on-background">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
