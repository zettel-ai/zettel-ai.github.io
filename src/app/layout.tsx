import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

import { CalendlyBadge } from "./_components/CalendlyBadge";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zettel Ops: Logistics Intelligence for Enterprise",
  description:
    "Zettel is an AI operations assistant that turns scattered shipping documents into container-level answers, actionable insights, and stakeholder updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <script src="https://assets.calendly.com/assets/external/widget.js" async />
        <script src="https://tally.so/widgets/embed.js" async />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        {children}
        <CalendlyBadge />
      </body>
    </html>
  );
}
