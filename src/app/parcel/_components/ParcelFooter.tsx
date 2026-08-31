import Image from "next/image";
import Link from "next/link";

import { navLinks } from "../_lib/content";

export function ParcelFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <Link href="/parcel/" className="inline-flex items-center gap-2.5">
            <Image src="/images/zettel_logo.png" alt="" width={28} height={28} className="h-7 w-auto" />
            <span className="text-xl font-semibold tracking-tight text-zinc-950">Zettel Parcel</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-on-surface-variant">
            Managed parcel billing review built around source-backed case files and verified financial outcomes.
          </p>
          <p className="mt-4 text-xs text-on-surface-variant">Zettel is not affiliated with UPS or FedEx.</p>
          <p className="mt-2 text-xs text-on-surface-variant">© {new Date().getFullYear()} Zettel Ops. All rights reserved.</p>
        </div>
        <nav aria-label="Parcel footer navigation" className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-on-surface-variant hover:text-primary">
              {link.label}
            </a>
          ))}
          <a href="mailto:zettel.ops@gmail.com" className="text-sm font-medium text-on-surface-variant hover:text-primary">Contact</a>
          <Link href="/" className="text-sm font-medium text-on-surface-variant hover:text-primary">Zettel Ops</Link>
        </nav>
      </div>
    </footer>
  );
}
