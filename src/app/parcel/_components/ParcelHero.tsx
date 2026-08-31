import { parcelCopy } from "../_lib/content";
import { CaseFile } from "./CaseFile";
import { StartFreeAuditButton } from "./StartFreeAuditButton";

export function ParcelHero() {
  return (
    <section className="relative overflow-hidden border-b border-outline-variant bg-surface-container-lowest">
      <div aria-hidden="true" className="absolute inset-y-0 right-[7%] hidden w-px bg-outline-variant/50 xl:block" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-16 lg:grid-cols-[.86fr_1.14fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{parcelCopy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(3rem,6.5vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-on-background">
            {parcelCopy.headline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-on-surface-variant">{parcelCopy.supporting}</p>
          <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold leading-6 text-on-background">{parcelCopy.riskLine}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <StartFreeAuditButton
              placement="hero"
              className="inline-flex h-12 cursor-pointer items-center justify-center bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-on-primary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
            <a href="#what-we-audit" className="inline-flex h-12 items-center justify-center border border-primary px-7 text-base font-semibold text-primary transition-colors hover:bg-primary-fixed/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {parcelCopy.secondaryCta}
            </a>
          </div>
        </div>
        <div className="relative lg:-mr-12 xl:-mr-20">
          <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full border border-primary-fixed bg-primary-fixed/20" />
          <div className="relative">
            <CaseFile />
          </div>
        </div>
      </div>
    </section>
  );
}
