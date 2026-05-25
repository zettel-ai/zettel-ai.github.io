import type { Metadata } from "next";

import { Footer } from "../_components/Footer";
import { TopNav } from "../_components/TopNav";

export const metadata: Metadata = {
  title: "FAQ | Zettel Ops",
  description:
    "Answers to common questions about Zettel Ops, the AI operations assistant for shipping documents, container-level context, exception handling, and follow-up workflows.",
};

const faqs = [
  {
    question: "What is Zettel Ops?",
    answer:
      "Zettel Ops is an AI operations assistant for shipping teams. It turns scattered documents, emails, messages, and PDFs into container-level answers, actions, and stakeholder updates so teams can keep freight moving without digging through inboxes and portals.",
  },
  {
    question: "Who is Zettel Ops built for?",
    answer:
      "Zettel Ops is built for teams managing containerized freight, including import operations teams, freight forwarders, NVOCCs, drayage coordinators, documentation teams, and finance/AP teams that rely on shipping documents to make operational decisions.",
  },
  {
    question: "What problem does Zettel Ops solve?",
    answer:
      "Zettel Ops solves the problem of scattered shipment information. BOLs, delivery orders, invoices, arrival notices, appointment confirmations, PODs, and email threads often live in different places. Zettel brings them together, links them to the right container or shipment, and tells teams what is missing, blocked, or at risk.",
  },
  {
    question: "What types of documents can Zettel Ops process?",
    answer:
      "Zettel Ops can process bills of lading, delivery orders, proof of delivery documents, arrival notices, commercial invoices, packing lists, appointment confirmations, email threads, messaging threads, and other shipment-related files.",
  },
  {
    question: "How does Zettel Ops ingest documents?",
    answer:
      "Teams can forward documents by email, drop them into a shared drive, upload them through a portal, or connect sources such as Google Drive and messaging tools. Zettel then classifies the documents, extracts important fields, and links them to the right shipment or container.",
  },
  {
    question: "What information does Zettel extract from documents?",
    answer:
      "Zettel can extract fields such as container ID, shipment reference, carrier, customer, terminal, arrival dates, Last Free Day, invoice details, delivery status, appointment details, counterparties, and other key operational data.",
  },
  {
    question: "What is the container-level context graph?",
    answer:
      "The container-level context graph is the connected data layer Zettel builds from your documents and shipment events. It links containers, documents, bookings, parties, dates, exceptions, appointments, and payment signals so teams can ask operational questions and get grounded answers.",
  },
  {
    question: "Can I ask Zettel Ops questions about my shipments?",
    answer:
      'Yes. You can ask questions like "Which shipments are blocked and why?", "What documents are missing?", "Which containers are at risk today?", "When is the Last Free Day?", or "Who do we need to contact?" Zettel answers using the underlying documents and shipment graph.',
  },
  {
    question: "How does Zettel show what is blocked?",
    answer:
      "Zettel does more than flag a missing document. It shows the consequence chain: which shipment, container, pickup, booking, handoff, SLA, or payment step is blocked because that document or update is missing.",
  },
  {
    question: "How does Zettel prioritize what to chase first?",
    answer:
      "Zettel ranks issues by business impact, including Last Free Day, demurrage exposure, detention risk, SLA risk, missing documents, and downstream blockers. This helps operations teams focus on the most urgent and expensive problems first.",
  },
  {
    question: "Can Zettel help prevent demurrage and detention charges?",
    answer:
      "Yes. Zettel helps teams identify containers approaching Last Free Day, missing delivery orders, delayed handoffs, appointment risks, and other issues that can lead to demurrage or detention. It surfaces the risk early and recommends the next action.",
  },
  {
    question: "Can Zettel detect document mismatches?",
    answer:
      "Yes. Zettel can compare related documents and flag mismatched references, conflicting fields, outdated versions, missing signatures, incorrect container IDs, or discrepancies between documents such as BOLs, delivery orders, invoices, and packing lists.",
  },
  {
    question: "Can Zettel recommend next steps?",
    answer:
      "Yes. When Zettel finds an exception, it can recommend resolution steps, identify who owns the blocker, and help draft the follow-up message needed to move the shipment forward.",
  },
  {
    question: "Can Zettel automate follow-up emails?",
    answer:
      "Yes. Zettel can help draft or trigger outreach to the responsible party when a document is overdue, a container is at risk, or a stakeholder needs to provide an update. The message can include context pulled from the shipment graph.",
  },
  {
    question: "Does Zettel replace my TMS or visibility platform?",
    answer:
      "No. Zettel is designed to complement existing systems. It focuses on the messy document, email, exception, and follow-up work that often happens outside the TMS or visibility platform.",
  },
  {
    question: "Can Zettel help finance and AP?",
    answer:
      "Yes. Zettel can help AP know when an invoice is safe to pay by checking whether shipment milestones, invoice data, proof of delivery, and exceptions all line up. It can also flag when payment should be held because of missing documents, damage, or unresolved exceptions.",
  },
  {
    question: "Can Zettel generate daily shipment briefings?",
    answer:
      "Yes. Zettel can generate shipment briefings that summarize blocked containers, missing documents, urgent risks, exceptions, follow-ups, and shipments that are safe to pay.",
  },
  {
    question: "What makes Zettel different from a basic document hub?",
    answer:
      "A basic document hub stores files. Zettel turns documents into connected operational intelligence. It links documents to containers, identifies downstream consequences, answers questions in natural language, and helps teams act on what is missing or at risk.",
  },
  {
    question: "Is Zettel available for pilot customers?",
    answer:
      "Yes. Zettel is offering early access and pilot opportunities for teams that want to automate documentation workflows, prevent avoidable delays, and improve container-level visibility.",
  },
  {
    question: "Is there an early adopter offer?",
    answer:
      "Yes. The current early adopter offer includes $200 in usage credits and the first three months of platform fees waived.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <TopNav />
      <main className="flex-grow bg-background pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <section className="border-b border-outline-variant bg-surface-container-lowest">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              FAQ
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-on-surface-variant">
              Answers about document ingestion, container-level context, blocked
              shipment workflows, demurrage risk, follow-up automation, and early
              access for Zettel Ops.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-14">
          <div className="divide-y divide-outline-variant border-y border-outline-variant">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group py-5"
                open={index < 3}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold leading-7 text-on-background marker:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined mt-0.5 text-[22px] text-primary transition-transform group-open:rotate-45"
                  >
                    add
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-base leading-7 text-on-surface-variant">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
