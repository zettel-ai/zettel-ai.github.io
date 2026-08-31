import { parcelStatistics } from "../_lib/content";

export function ParcelStatsSection() {
  return (
    <section className="border-b border-outline-variant bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Why this is worth auditing</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-on-background sm:text-5xl">Parcel billing is a moving target at massive scale.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-on-surface-variant lg:justify-self-end">
            Billions of shipments, annual rate changes, and hundreds of billing fields create a lot of places for one confusing charge to hide.
          </p>
        </div>

        <div className="mt-12 border-y border-outline-variant bg-white">
          <div className="grid md:grid-cols-3">
            {parcelStatistics.map((stat, index) => (
              <article key={stat.value} className={`p-6 sm:p-7 ${index > 0 ? "border-t border-outline-variant md:border-l md:border-t-0" : ""}`}>
                <p className="font-mono text-4xl font-semibold tracking-[-0.04em] text-on-background sm:text-5xl">{stat.value}</p>
                <h3 className="mt-4 text-sm font-semibold leading-6 text-on-background">{stat.label}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{stat.body}</p>
                <div className="mt-5 space-y-1.5">
                  {stat.sources.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="block text-xs font-semibold text-primary hover:underline">
                      Source: {source.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
