import Image from "next/image";

export function Solution() {
  return (
    <section className="py-24 bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-on-background mb-4">
            A context graph for drayage operations.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            <strong className="font-medium text-on-background">
              Ops teams spend nearly 14 hours/week manually tracking data.
            </strong>{" "}
            Bring in shipping documents from any source, AI will organize
            everything automatically, and get clean, actionable output.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto mt-8">
          <Image
            src="/images/laptop_mock.png"
            alt="Zettel Ops desktop app preview"
            width={2400}
            height={1500}
            className="w-full h-auto drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
