import { TopNav } from "./_components/TopNav";
import { Hero } from "./_components/Hero";
import { Steps } from "./_components/Steps";
import { Problem } from "./_components/Problem";
import { Solution } from "./_components/Solution";
import { FeatureGrid } from "./_components/FeatureGrid";
import { FinalCTA } from "./_components/FinalCTA";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-grow pt-20">
        <div className="min-h-[calc(100dvh-5rem)] flex flex-col gap-6 bg-surface-container-lowest">
          <Hero />
          <Steps />
        </div>
        <Problem />
        <Solution />
        <FeatureGrid />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
