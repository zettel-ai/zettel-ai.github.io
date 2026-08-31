"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { navLinks } from "../_lib/content";
import { StartFreeAuditButton } from "./StartFreeAuditButton";

export function ParcelTopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
        <Link href="/parcel/" className="inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <Image src="/images/zettel_logo.png" alt="" width={28} height={28} priority className="h-7 w-auto" />
          <span className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">Zettel Parcel</span>
        </Link>

        <nav aria-label="Parcel navigation" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              {link.label}
            </a>
          ))}
          <StartFreeAuditButton
            placement="nav"
            className="inline-flex h-10 cursor-pointer items-center justify-center bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-on-primary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="parcel-mobile-navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-outline-variant text-on-background hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
        >
          <span aria-hidden="true" className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>
      </div>

      {open && (
        <nav id="parcel-mobile-navigation" aria-label="Parcel mobile navigation" className="border-t border-outline-variant bg-white px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-surface-container py-3 text-base font-medium text-on-background focus-visible:outline-2 focus-visible:outline-primary">
                {link.label}
              </a>
            ))}
            <StartFreeAuditButton placement="nav" className="mt-4 inline-flex h-12 cursor-pointer items-center justify-center bg-primary px-5 text-base font-semibold text-white" />
          </div>
        </nav>
      )}
    </header>
  );
}
