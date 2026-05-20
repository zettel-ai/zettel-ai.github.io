import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-10 pb-6 overflow-hidden bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end w-full max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-on-background mb-5 leading-tight">
              Keep containers{" "}
              <span className="text-primary font-bold">moving</span>
              <br />
              without digging through
              <br />
              emails and PDFs.
            </h1>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              An AI operations assistant that turns scattered shipping
              documents into container-level answers, actions, and stakeholder
              updates — all manageable from your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#early-access"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors group"
              >
                Request a Pilot
                <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
              <a
                href="#early-access"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-primary border border-primary hover:bg-primary-fixed transition-colors"
              >
                Join Early Access
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-[200px] mx-auto lg:ml-auto">
            <Image
              src="/images/phone_mock.png"
              alt="Zettel Ops mobile app preview"
              width={800}
              height={1600}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
