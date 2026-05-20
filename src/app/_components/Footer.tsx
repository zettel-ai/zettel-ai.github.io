import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Image
            src="/images/zettel_logo.png"
            alt="Zettel Ops"
            width={28}
            height={28}
            className="h-7 w-auto"
          />
          <span className="text-xl font-semibold tracking-tighter text-zinc-900">
            Zettel Ops
          </span>
        </div>
        <p className="text-sm text-on-surface-variant">
          © {new Date().getFullYear()} Zettel Ops. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
