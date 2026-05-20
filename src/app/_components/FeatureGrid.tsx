type Feature = {
  icon: string;
  title: string;
  body: string;
  source: string;
};

const features: Feature[] = [
  {
    icon: "local_shipping",
    title: "Keep Containers Moving",
    body: "Catch missing delivery orders, arrival notices, and BOLs before they stall pickup or release. eBL transactions average 2.6 days vs 30 days for paper methods.",
    source: "Source: DCSA",
  },
  {
    icon: "priority_high",
    title: "Prioritize High-Risk Shipments",
    body: "Rank containers by Last Free Day, demurrage, and SLA exposure. Ocean carriers collected $15.4B in D&D charges from April 2020 through March 2025.",
    source: "Source: FMC Data",
  },
  {
    icon: "hub",
    title: "See Downstream Impact",
    body: "When a document is missing, see the full blast radius across bookings and counterparties. Transactions average 36 documents and 20+ parties.",
    source: "Source: WTO Research",
  },
  {
    icon: "rule",
    title: "Resolve Exceptions Early",
    body: "Find mismatched references or outdated versions before they turn into pickup misses. Digitizing trade documents can reduce processing days by up to 75%.",
    source: "Source: WTO Research",
  },
  {
    icon: "payments",
    title: "Clear Pay-Ready Signals",
    body: "Give AP a defensible pay-ready signal only when shipment milestones and invoice data align. Exceptions were the top AP challenge for 53% of teams in 2024.",
    source: "Source: Ardent Partners",
  },
  {
    icon: "sync",
    title: "Email & Messaging Sync",
    body: "Chase documents from email while the system keeps context synchronized. McKinsey estimates teams spend 28% of the workweek managing email threads.",
    source: "Source: McKinsey",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 bg-surface border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-light text-on-background mb-16 text-center">
          From passive visibility to active prioritization.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-primary-fixed-variant text-2xl">
                  {f.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-on-background mb-3">
                {f.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {f.body}
                <strong className="block mt-3 text-sm font-semibold opacity-90 text-primary uppercase tracking-wider">
                  {f.source}
                </strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
