import Image from "next/image";

import { RequestPilotButton } from "./RequestPilotButton";

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
            <div className="mb-6 mx-auto lg:mx-0 border border-primary/30 bg-white/95 px-5 py-4 text-left shadow-sm">
              <p className="text-lg leading-relaxed text-on-surface-variant text-pretty">
                Zettel is an AI operations assistant that turns scattered
                shipping documents (BOLs, DOs, invoices, arrival notices) into
                container-level answers, actions, and stakeholder updates. Ask
                anything, or let it chase what&apos;s missing.{" "}
                <span className="font-semibold text-on-background">
                  All from your inbox.
                </span>
              </p>
            </div>
            <div className="mb-8 mx-auto lg:mx-0 inline-flex max-w-full flex-col gap-1 border border-primary bg-primary-fixed px-4 py-3 text-left shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Early adopter offer
              </p>
              <p className="text-base font-semibold leading-6 text-on-background">
                Get $200 in usage credits and the first 3 months of platform fees waived.
              </p>
            </div>
            <div className="relative mx-auto mb-8 w-full max-w-[360px] lg:hidden">
              <Image
                src="/images/iphone_hero_improved.png"
                alt="Zettel Ops mobile app preview"
                width={1024}
                height={1024}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <RequestPilotButton className="group relative inline-flex cursor-pointer items-center justify-center h-12 px-8 text-base font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors">
                Request a Pilot
                <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-inverse-surface px-3 py-1.5 text-xs font-normal text-inverse-on-surface opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block sm:whitespace-nowrap">
                  Schedule a time to talk with us
                </span>
              </RequestPilotButton>
              <button
                type="button"
                data-tally-open="NpRbO0"
                data-tally-layout="modal"
                data-tally-emoji-animation="none"
                data-tally-auto-close="1000"
                data-tally-form-events-forwarding="1"
                aria-label="Join Early Access — join the list to hear updates as the product becomes more publicly available"
                className="group relative inline-flex cursor-pointer items-center justify-center h-12 px-8 text-base font-medium text-primary border border-primary hover:bg-primary-fixed transition-colors"
              >
                Join Early Access
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-inverse-surface px-3 py-1.5 text-xs font-normal text-inverse-on-surface opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block sm:whitespace-nowrap">
                  Hear updates as the product becomes more publicly available
                </span>
              </button>
            </div>
          </div>
          <div className="relative hidden w-full max-w-[563px] mx-auto lg:mx-0 lg:ml-auto lg:block">
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
