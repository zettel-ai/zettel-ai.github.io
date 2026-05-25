import type { Metadata } from "next";

import { Contact } from "../_components/Contact";
import { Footer } from "../_components/Footer";
import { TopNav } from "../_components/TopNav";

export const metadata: Metadata = {
  title: "Contact | Zettel Ops",
  description:
    "Book a 30-minute pilot call, join the early-access list, or email the Zettel Ops team.",
};

export default function ContactPage() {
  return (
    <>
      <TopNav />
      <main className="flex-grow bg-background pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
