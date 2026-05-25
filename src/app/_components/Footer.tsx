import Image from "next/image";
import Link from "next/link";

// Each column holds one or more headings; a heading may have its own sub-links.
const footerNavColumns = [
  [
    {
      title: "Blog",
      href: "/blog",
      links: [
        { label: "Featured Blog", href: "/blog#featured" },
        { label: "Latest Blogs", href: "/blog#latest" },
      ],
    },
  ],
  [
    { title: "Home", href: "/", links: [] },
    { title: "FAQ", href: "/faq", links: [] },
  ],
  [
    {
      title: "Contact Us",
      href: "/contact",
      links: [
        { label: "Request pilot", href: "/contact#request-pilot" },
        { label: "Join Early Access", href: "/contact#early-access" },
      ],
    },
  ],
];

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] md:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
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
            </Link>
            <p className="mt-4 text-sm text-on-surface-variant">
              © {new Date().getFullYear()} Zettel Ops. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-8 sm:grid-cols-3">
            {footerNavColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6">
                {column.map((group) => (
                  <div key={group.title}>
                    <Link
                      href={group.href}
                      className="text-sm font-semibold text-on-background transition-colors hover:text-primary"
                    >
                      {group.title}
                    </Link>
                    {group.links.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-sm text-on-surface-variant transition-colors hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
