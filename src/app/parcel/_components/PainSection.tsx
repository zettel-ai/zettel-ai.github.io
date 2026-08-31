import { painCards } from "../_lib/content";

export function PainSection() {
  return (
    <section className="border-b border-outline-variant bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-error">Why shippers give up</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">The charge is small. The investigation is not.</h2>
        </div>
        <div className="mt-12 grid gap-px bg-outline-variant sm:grid-cols-2">
          {painCards.map((card) => (
            <article key={card.title} className="bg-surface-container-lowest p-6 sm:p-8">
              <span aria-hidden="true" className="material-symbols-outlined text-[28px] text-error">receipt_long</span>
              <h3 className="mt-7 max-w-md text-xl font-semibold tracking-tight text-on-background sm:text-2xl">{card.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-on-surface-variant">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
