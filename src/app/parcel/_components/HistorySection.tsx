import Image from "next/image";

export function HistorySection() {
  return (
    <section className="border-b border-outline-variant bg-background px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <figure className="order-2 border border-outline-variant bg-white p-3 sm:p-5 lg:order-1">
          <Image
            src="/diagrams/parcel/same-box-different-bill.svg"
            alt="Diagram comparing three historically consistent shipments from a similar package profile with one later carrier-assessed adjustment, labeled historical context rather than proof."
            width={968}
            height={346}
            unoptimized
            className="h-auto w-full"
          />
          <figcaption className="mt-3 border-t border-outline-variant pt-3 text-xs leading-5 text-on-surface-variant">Historical context can tell a reviewer where to look closer. It cannot establish the physical facts of a specific package by itself.</figcaption>
        </figure>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tertiary">Your history matters</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-on-background sm:text-5xl">Same box. Different bill.</h2>
          <p className="mt-6 text-lg leading-8 text-on-surface-variant">
            A single adjustment can be ambiguous. A similar package profile across your own shipping history can make the change obvious enough to deserve closer review.
          </p>
          <div className="mt-7 border-l-2 border-tertiary pl-4 text-sm font-semibold leading-6 text-on-background">Similar package profile is context — not proof that the carrier is wrong.</div>
        </div>
      </div>
    </section>
  );
}
