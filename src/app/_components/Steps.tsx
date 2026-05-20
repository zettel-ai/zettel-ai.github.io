import Image from "next/image";

const diagrams = [
  { title: "Ingest", src: "/diagrams/ingest.svg" },
  { title: "Analyze", src: "/diagrams/analyze.svg" },
  { title: "Communicate", src: "/diagrams/communicate.svg" },
];

export function Steps() {
  return (
    <section className="py-8 bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {diagrams.map((d, i) => (
            <div key={d.title} className="contents">
              <Image
                src={d.src}
                alt={`${d.title} diagram`}
                width={400}
                height={300}
                className="flex-1 w-full h-auto max-w-sm"
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
      </div>
    </section>
  );
}
