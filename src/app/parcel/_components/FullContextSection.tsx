export function FullContextSection() {
  return (
    <section className="border-b border-outline-variant bg-surface-container-lowest px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">One charge. Full context.</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">Every charge gets a case file.</h2>
          <p className="mt-6 text-lg leading-8 text-on-surface-variant">
            See what changed, which rule applied, what evidence supports the review, what is missing, what the carrier said, and whether money actually came back.
          </p>
          <ul className="mt-7 space-y-3 text-sm leading-6 text-on-background">
            {[
              "Source facts stay traceable to the underlying record.",
              "Rules are tied to the time and scope in which they applied.",
              "History adds context without pretending to be proof.",
              "A recommendation remains reviewable before any sensitive action.",
            ].map((item) => (
              <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-1 text-primary">→</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <figure className="border border-outline-variant bg-white p-3 sm:p-5">
          <img src="/diagrams/parcel/parcel-case-assembly.svg" alt="Diagram showing invoice, shipment facts, rule, evidence, and relevant history becoming a Zettel Case File, then human review, carrier response, and a verified credit." className="h-auto w-full" />
          <figcaption className="mt-3 border-t border-outline-variant pt-3 text-xs leading-5 text-on-surface-variant">The Case File assembles source facts and context into a reviewable next action. It does not turn history into proof or bypass human control.</figcaption>
        </figure>
      </div>
    </section>
  );
}
