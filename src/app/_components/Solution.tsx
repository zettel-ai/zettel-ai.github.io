import Image from "next/image";

export function Solution() {
  return (
    <section className="pt-16 pb-8 md:py-24 bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-on-background mb-4">
            Reads every BOL, DO, and invoice
            <br />
            the moment it lands.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto text-pretty">
            <strong className="font-medium text-on-background">
              Ops teams spend nearly 14 hours/week manually tracking data.
            </strong>{" "}
            Forward documents in, drop them in a shared drive, or let Zettel
            watch your inbox. It pulls every BOL, DO, invoice, and arrival
            notice into a container-level context graph. Ask a question, get
            an actual answer. Flag an exception, get a recommended action.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div
            className="relative aspect-[2568/1590] w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            <Image
              src="/images/email_interaction.png"
              alt="Zettel daily shipment briefing in an email client"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
