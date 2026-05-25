type Card = { title: string; body: string; source: string; sourceUrl: string };

const cards: Card[] = [
  {
    title: "Your paper trail is a maze",
    body: "Documents are scattered across inboxes, drives, portals, and forwarded threads. A single shipment can require up to 50 sheets of paper exchanged with up to 30 stakeholders. Operations slow down, errors creep in, and nobody has the full picture.",
    source: "Source: McKinsey Research",
    sourceUrl:
      "https://www.mckinsey.com/industries/logistics/our-insights/the-multi-billion-dollar-paper-jam-unlocking-trade-by-digitalizing-documentation",
  },
  {
    title: "Every missed doc costs real money",
    body: "Missing docs and delayed handoffs trigger LFD, demurrage, and detention fees. With $15.4B in charges collected by ocean carriers annually, an unresolved document is a direct financial threat, and exception costs land on your P&L, not the carrier's.",
    source: "Source: FMC Report",
    sourceUrl: "https://www.fmc.gov/detention-and-demurrage/",
  },
  {
    title: "You spend your week chasing status",
    body: "Ops teams spend 14+ hours a week hunting for status across email, portals, and phone, but still lack actionable guidance. Zettel goes beyond visibility to tell you exactly what's blocked, why it matters, who to contact, and what to send them.",
    source: "Source: LeanDNA Survey",
    sourceUrl:
      "https://www.leandna.com/resource/supply-chain-executives-survey-2024/",
  },
];

export function Problem() {
  return (
    <section className="py-24 bg-surface border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-on-background mb-4">
            Your documents are scattered.
            <br />
            <span className="font-medium">Zettel pulls them together.</span>
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto text-pretty">
            Shipping operations depend on BOLs, DOs, invoices, arrival
            notices, and vendor paperwork, but today every shipment lives
            across a dozen inboxes, shared drives, and forwarded threads.
            Here&apos;s what that fragmentation actually costs you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="p-5 lg:p-6 border border-error-container bg-error-container/20 rounded-2xl shadow-sm"
            >
              <h3 className="text-base lg:text-lg font-semibold text-error mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-xl shrink-0">
                  warning
                </span>
                {c.title}
              </h3>
              <p className="text-sm lg:text-base text-on-background leading-relaxed">
                {c.body}
                <a
                  href={c.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-xs lg:text-sm font-semibold text-error uppercase tracking-wider hover:underline"
                >
                  {c.source}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
