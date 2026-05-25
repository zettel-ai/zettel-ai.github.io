type Feature = {
  icon: string;
  title: string;
  body: string;
  source: string;
  sourceUrl: string;
};

const features: Feature[] = [
  {
    icon: "priority_high",
    title: "Ranks what to chase first",
    body: "Sorts your containers by Last Free Day, demurrage exposure, and SLA risk, so the most expensive problem is always at the top of your list. Ocean carriers collected $15.4B in D&D charges from April 2020 through March 2025.",
    source: "Source: FMC Data",
    sourceUrl: "https://www.fmc.gov/detention-and-demurrage/",
  },
  {
    icon: "hub",
    title: "Shows who's affected when a doc is missing",
    body: "When a document is missing, see the full blast radius across bookings, counterparties, and downstream handoffs, not just the immediate container. A typical international transaction touches 36 documents and 20+ parties.",
    source: "Source: WTO Research",
    sourceUrl:
      "https://www.wto.org/english/tratop_e/tradfa_e/tradfa_e.htm",
  },
  {
    icon: "rule",
    title: "Spots mismatched versions before they bite",
    body: "Catches outdated references, conflicting fields, and version drift between BOL, DO, and invoice before they turn into pickup misses. Digitizing trade documents can reduce processing time by up to 75%.",
    source: "Source: WTO Research",
    sourceUrl:
      "https://www.wto.org/english/tratop_e/tradfa_e/tradfa_e.htm",
  },
  {
    icon: "payments",
    title: "Tells AP when it's safe to pay",
    body: "Gives AP a defensible pay-ready signal only when shipment milestones, invoice data, and POD all agree. Exceptions were the top AP challenge for 53% of teams in 2024, and the #1 reason invoices go on hold.",
    source: "Source: Ardent Partners",
    sourceUrl: "https://ardentpartners.com/",
  },
  {
    icon: "local_shipping",
    title: "Catches missing docs before pickup stalls",
    body: "Spots the missing delivery order, arrival notice, or BOL before it turns into a sitting container, and tells you exactly which party owes you what. Digital document handoffs measurably improve end-to-end transaction times over paper-based workflows.",
    source: "Source: DCSA",
    sourceUrl: "https://dcsa.org/initiatives/electronic-bill-of-lading",
  },
  {
    icon: "sync",
    title: "Lives in your inbox, not another tab",
    body: "Reply to a thread, forward a vendor message, or ask a question. Zettel works in email and messaging where context already lives. McKinsey estimates teams spend 28% of the workweek managing email threads.",
    source: "Source: McKinsey",
    sourceUrl:
      "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 bg-surface border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-light text-on-background mb-16 text-center">
          Keeps your containers moving
          <br />
          <span className="font-medium">while you do everything else.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-container-lowest p-5 lg:p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-4 lg:mb-6">
                <span className="material-symbols-outlined text-on-primary-fixed-variant text-xl lg:text-2xl">
                  {f.icon}
                </span>
              </div>
              <h3 className="text-base lg:text-lg font-semibold text-on-background mb-3">
                {f.title}
              </h3>
              <p className="text-sm lg:text-base text-on-surface-variant leading-relaxed">
                {f.body}
                <a
                  href={f.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-xs lg:text-sm font-semibold text-primary uppercase tracking-wider hover:underline"
                >
                  {f.source}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
