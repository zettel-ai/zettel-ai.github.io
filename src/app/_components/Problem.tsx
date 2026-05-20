type Card = { title: string; body: string; source: string };

const cards: Card[] = [
  {
    title: "Shipping Document Chaos",
    body: "Documents are scattered across inboxes, drives, portals, and forwarded threads. A single shipment can require up to 50 sheets of paper exchanged with up to 30 stakeholders, making operations slow and error-prone.",
    source: "Source: McKinsey Research",
  },
  {
    title: "Costly Exception Risk",
    body: "Missing docs and delayed handoffs trigger LFD, demurrage, and detention fees. With $15.4B in charges collected by carriers annually, an unresolved document is a direct financial threat.",
    source: "Source: FMC Report",
  },
  {
    title: "Manual Tracking",
    body: "Teams spend 14+ hours a week hunting for status but still lack actionable guidance. Zettel Ops goes beyond visibility to tell you exactly what’s blocked, why it matters, and who to contact.",
    source: "Source: LeanDNA Survey",
  },
];

export function Problem() {
  return (
    <section className="py-24 bg-surface border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-on-background mb-4">
            Shipping Paperwork is Fragmented
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            Operations depend on BOLs, DOs, invoices, arrival notices, and
            vendor paperwork — but today they&apos;re scattered across inboxes,
            shared drives, and forwarded email chains.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c) => (
            <div
              key={c.title}
              className="p-8 border border-error-container bg-error-container/20 rounded-2xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-error mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-error">
                  warning
                </span>
                {c.title}
              </h3>
              <p className="text-on-background leading-relaxed">
                {c.body}
                <strong className="block mt-3 text-sm font-semibold opacity-90 text-error/80 uppercase tracking-wider">
                  {c.source}
                </strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
