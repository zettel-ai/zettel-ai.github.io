import Image from "next/image";

export function TopNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/zettel_logo.png"
            alt="Zettel Ops"
            width={28}
            height={28}
            className="h-7 w-auto"
            priority
          />
          <span className="text-xl font-semibold tracking-tighter text-zinc-900">
            Zettel Ops
          </span>
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#early-access"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors active:scale-95 duration-150"
          >
            Request a Pilot
          </a>
        </div>
      </div>
    </header>
  );
}
