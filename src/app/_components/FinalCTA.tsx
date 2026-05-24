export function FinalCTA() {
  return (
    <section
      id="early-access"
      className="py-24 bg-surface-container-lowest border-b border-outline-variant"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-light text-on-background mb-6">
          Ready to put Zettel to work?
        </h2>
        <p className="text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
          Join the early-access cohort for ops teams that want to prevent
          avoidable delays, automate documentation, and get a handle on
          container-level visibility. We&apos;ll walk through the workflow,
          show you the product, and figure out together how we can help you
          keep containers moving.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href="#early-access"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors"
          >
            Request a Pilot
          </a>
          <a
            href="#early-access"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-primary border border-primary hover:bg-primary-fixed transition-colors"
          >
            Join Early Access
          </a>
        </div>
      </div>
    </section>
  );
}
