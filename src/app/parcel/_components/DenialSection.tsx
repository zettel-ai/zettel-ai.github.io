import { parcelCopy } from "../_lib/content";

const states = [
  ["Submitted", "The exact reviewed case and evidence are preserved."],
  ["Carrier responded", "The response and stated reason become new source material."],
  ["Denied / needs evidence", "A denial does not delete the original case or manufacture a new fact."],
  ["Next supported action", "Zettel reviews the reason and evidence gap; an appeal is not assumed to exist."],
  ["Resolved", "Closed, credit pending, or Credit verified stay distinct outcomes."],
] as const;

export function DenialSection() {
  return (
    <section className="border-b border-outline-variant bg-on-background px-6 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-fixed">Carrier response</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{parcelCopy.denialHeadline}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">The carrier response becomes another piece of the case. Evidence stays attached, gaps stay visible, and the next action stays bounded by what is actually supported.</p>
          </div>
          <ol className="border-y border-zinc-700">
            {states.map(([title, body], index) => (
              <li key={title} className="grid gap-2 border-b border-zinc-700 py-5 last:border-0 sm:grid-cols-[3.5rem_13rem_1fr] sm:items-start sm:gap-5">
                <span className="font-mono text-xs text-primary-fixed">0{index + 1}</span>
                <span className="font-semibold">{title}</span>
                <span className="text-sm leading-6 text-zinc-300">{body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
