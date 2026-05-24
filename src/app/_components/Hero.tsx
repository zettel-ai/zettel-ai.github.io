import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-10 pb-6 overflow-hidden bg-surface-container-lowest">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/blue-containers.jpg')] bg-cover bg-center opacity-40 [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-surface-container-lowest from-30% via-surface-container-lowest/60 via-60% to-transparent"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center w-full">
          <div className="text-center lg:text-left max-w-[760px]">
            <h1 className="text-4xl lg:text-[2rem] font-light tracking-tight text-on-background mb-5 leading-tight text-balance">
              Meet Zettel.{" "}
              <span className="text-primary font-bold">
                Your Operations Assistant.
              </span>
              <br />
              Keep containers{" "}
              <span className="text-primary font-bold">moving</span> without
              digging
              <br />
              through emails, messages, and PDFs.
            </h1>
            <p className="text-lg text-on-surface-variant mb-8 mx-auto lg:mx-0 leading-relaxed text-pretty">
              Zettel is an AI operations assistant that turns scattered
              shipping documents (BOLs, DOs, invoices, arrival notices) into
              container-level answers, actions, and stakeholder updates. Ask
              anything, or let it chase what&apos;s missing. All from your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#early-access"
                aria-label="Request a Pilot — schedule a time to talk with us"
                className="group relative inline-flex items-center justify-center h-12 px-8 text-base font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors"
              >
                Request a Pilot
                <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-inverse-surface text-inverse-on-surface text-xs font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  Schedule a time to talk with us
                </span>
              </a>
              <a
                href="#early-access"
                aria-label="Join Early Access — join the list to hear updates as the product becomes more publicly available"
                className="group relative inline-flex items-center justify-center h-12 px-8 text-base font-medium text-primary border border-primary hover:bg-primary-fixed transition-colors"
              >
                Join Early Access
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md bg-inverse-surface text-inverse-on-surface text-xs font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  Hear updates as the product becomes more publicly available
                </span>
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-[563px] mx-auto lg:mx-0 lg:ml-auto">
            <Image
              src="/images/iphone_hero_improved.png"
              alt="Zettel Ops mobile app preview"
              width={1024}
              height={1024}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
