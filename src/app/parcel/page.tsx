import { AuditCategoriesSection } from "./_components/AuditCategoriesSection";
import { AuditIntakeProvider } from "./_components/AuditIntakeProvider";
import { DataTrustSection } from "./_components/DataTrustSection";
import { DenialSection } from "./_components/DenialSection";
import { EvidenceTrustSection } from "./_components/EvidenceTrustSection";
import { FaqSection } from "./_components/FaqSection";
import { FinalParcelCta } from "./_components/FinalParcelCta";
import { FullContextSection } from "./_components/FullContextSection";
import { HistorySection } from "./_components/HistorySection";
import { HowItWorksSection } from "./_components/HowItWorksSection";
import { PainSection } from "./_components/PainSection";
import { ParcelFooter } from "./_components/ParcelFooter";
import { ParcelHero } from "./_components/ParcelHero";
import { ParcelStatsSection } from "./_components/ParcelStatsSection";
import { ParcelTopNav } from "./_components/ParcelTopNav";
import { PricingSection } from "./_components/PricingSection";
import { RiskReversalStrip } from "./_components/RiskReversalStrip";

export default function ParcelPage() {
  return (
    <AuditIntakeProvider>
      <ParcelTopNav />
      <main className="flex-grow pt-[69px]">
        <ParcelHero />
        <RiskReversalStrip />
        <ParcelStatsSection />
        <PainSection />
        <FullContextSection />
        <HistorySection />
        <HowItWorksSection />
        <DenialSection />
        <AuditCategoriesSection />
        <EvidenceTrustSection />
        <PricingSection />
        <DataTrustSection />
        <FaqSection />
        <FinalParcelCta />
      </main>
      <ParcelFooter />
    </AuditIntakeProvider>
  );
}
