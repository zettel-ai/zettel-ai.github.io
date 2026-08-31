import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zettel Parcel | Managed UPS & FedEx Refund + Billing Audit",
  description:
    "Zettel Parcel reviews UPS and FedEx shipping bills, builds evidence-backed cases for supported charges, and charges only after verified carrier credits are recovered.",
};

export default function ParcelLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
