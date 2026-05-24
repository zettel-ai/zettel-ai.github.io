import Image from "next/image";

const diagrams = [
  { title: "Ingest", src: "/diagrams/ingest.svg" },
  { title: "Analyze", src: "/diagrams/analyze.svg" },
  { title: "Communicate", src: "/diagrams/communicate.svg" },
];

export function Steps() {
  return (
    <section className="py-12 bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-light text-on-background mb-10 text-center">
          Fits into your workflow,
          <br className="md:hidden" />{" "}
          not the other way around.
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {diagrams.map((d, i) => (
            <div key={d.title} className="contents">
              <Image
                src={d.src}
                alt={`${d.title} diagram`}
                width={400}
                height={300}
                className="flex-1 w-full h-auto max-w-[340px]"
              />
              {i < diagrams.length - 1 && (
                <span
                  aria-hidden
                  className="material-symbols-outlined text-on-surface-variant text-5xl rotate-90 md:rotate-0 shrink-0"
                >
                  chevron_right
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-base text-on-surface-variant max-w-3xl mx-auto mt-10 text-center leading-relaxed">
          Zettel <span className="font-medium text-on-background">ingests</span>{" "}
          documents from email, Google Drive, and messaging,{" "}
          <span className="font-medium text-on-background">analyzes</span>{" "}
          them at the container level to surface what&apos;s blocked and
          what&apos;s at risk, then{" "}
          <span className="font-medium text-on-background">communicates</span>{" "}
          back through the channels your stakeholders already use.
        </p>
      </div>
    </section>
  );
}
