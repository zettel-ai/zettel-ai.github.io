import { auditCategories } from "../_lib/content";

export function AuditCategoriesSection() {
  const validated = auditCategories.filter((category) => category.launchState === "validated");

  return (
    <section id="what-we-audit" className="scroll-mt-24 border-b border-outline-variant bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">What we audit</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">We start from your bill, not a static checklist.</h2>
            <p className="mt-6 text-lg leading-8 text-on-surface-variant">
              Carrier, service, shipment date, agreement, billed facts, and available evidence determine what is actually supportable. We only publish a charge category here after its operating workflow has been validated.
            </p>
          </div>
          <div className="border border-outline-variant bg-white p-6 sm:p-8">
            {validated.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {validated.map((category) => (
                  <article key={category.id} className="border border-outline-variant p-4">
                    <h3 className="font-semibold text-on-background">{category.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{category.check}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col justify-between">
                <span aria-hidden="true" className="material-symbols-outlined text-[38px] text-primary">fact_check</span>
                <div>
                  <p className="text-xl font-semibold tracking-tight text-on-background">Coverage is intentionally readiness-gated.</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">The free audit tells you whether there are charges worth reviewing. The public page will not advertise a carrier workflow until Zettel has validated the real submission, response, evidence, and credit-verification path.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
