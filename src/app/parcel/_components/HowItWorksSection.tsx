import { processSteps } from "../_lib/content";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-outline-variant bg-surface-container-lowest px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">How Zettel works</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">From one invoice to one understandable case.</h2>
        <div className="mt-12 grid border-y border-outline-variant md:grid-cols-4">
          {processSteps.map((step, index) => (
            <article key={step.title} className={`py-6 md:px-6 ${index > 0 ? "border-t border-outline-variant md:border-l md:border-t-0" : ""}`}>
              <p className="font-mono text-xs font-semibold text-primary">0{index + 1}</p>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-on-background">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
