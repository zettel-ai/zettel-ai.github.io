export function DataTrustSection() {
  return (
    <section className="border-b border-outline-variant bg-primary px-6 py-20 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-fixed">Lower-friction start</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Start with an invoice, not your password.</h2>
        </div>
        <div className="grid gap-4 text-sm leading-6 text-green-50 sm:grid-cols-2">
          <p className="border-t border-green-300/40 pt-4">The landing page collects only the details needed to start a conversation. It does not upload carrier billing files.</p>
          <p className="border-t border-green-300/40 pt-4">We request a recent invoice separately and only discuss additional carrier access if a validated ongoing workflow requires it.</p>
          <p className="border-t border-green-300/40 pt-4">Sensitive carrier actions remain reviewable. The reason and evidence stay visible with the case.</p>
          <p className="border-t border-green-300/40 pt-4">Zettel is independent and is not affiliated with UPS or FedEx.</p>
        </div>
      </div>
    </section>
  );
}
