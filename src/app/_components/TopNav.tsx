"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { RequestPilotButton } from "./RequestPilotButton";
import { Tooltip } from "./Tooltip";

export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass =
    "text-sm font-medium text-on-surface-variant transition-colors hover:text-primary";

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-zinc-200">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
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
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className={navLinkClass}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={navLinkClass}
          >
            Blog
          </Link>
          <Link
            href="/faq"
            className={navLinkClass}
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className={navLinkClass}
          >
            Contact
          </Link>
          <RequestPilotButton className="group relative inline-flex cursor-pointer items-center justify-center h-10 px-6 text-sm font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors active:scale-95 duration-150">
            Request a Pilot
            <Tooltip text="Schedule a time to talk with us" placement="bottom-right" />
          </RequestPilotButton>
        </div>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-outline-variant text-on-background transition-colors hover:border-primary hover:text-primary"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-outline-variant bg-white px-6 py-4 shadow-lg"
        >
          <div className="flex flex-col gap-1">
            <Link href="/" className="px-1 py-3 text-base font-medium text-on-background">
              Home
            </Link>
            <Link href="/blog" className="px-1 py-3 text-base font-medium text-on-background">
              Blog
            </Link>
            <Link href="/faq" className="px-1 py-3 text-base font-medium text-on-background">
              FAQ
            </Link>
            <Link href="/contact" className="px-1 py-3 text-base font-medium text-on-background">
              Contact
            </Link>
            <RequestPilotButton className="mt-3 inline-flex cursor-pointer items-center justify-center h-11 px-5 text-base font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors active:scale-95 duration-150">
              Request a Pilot
            </RequestPilotButton>
          </div>
        </nav>
      )}
    </header>
  );
}
