import { readFileSync } from "node:fs";

const footer = readFileSync("src/app/_components/Footer.tsx", "utf8");
const blogPage = readFileSync("src/app/blog/page.tsx", "utf8");
const contact = readFileSync("src/app/_components/Contact.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const footerLinks = [
  ['href: "/blog"', "Blog"],
  ['href: "/blog#featured"', "Featured Blog"],
  ['href: "/blog#latest"', "Latest Blogs"],
  ['href: "/contact"', "Contact Us"],
  ['href: "/contact#request-pilot"', "Request pilot"],
  ['href: "/contact#early-access"', "Join Early Access"],
];

for (const [href, label] of footerLinks) {
  assert(footer.includes(href) && footer.includes(label), `Footer must include ${label} linked with ${href}.`);
}

assert(footer.includes('<Link href="/" className="inline-flex items-center gap-2">'), "Footer logo must still link home.");

assert(blogPage.includes('id="featured"'), "Blog page must expose a #featured anchor.");
assert(blogPage.includes('id="latest"'), "Blog page must expose a #latest anchor.");
assert(contact.includes('id="request-pilot"'), "Contact page must expose a #request-pilot anchor.");
assert(contact.includes('id="early-access"'), "Contact page must expose a #early-access anchor.");
