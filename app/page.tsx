import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { WhyNow } from "@/components/WhyNow";
import { Process } from "@/components/Process";
import { SignalsPreview } from "@/components/SignalsPreview";
import { Pricing } from "@/components/Pricing";
import { PilotDelta } from "@/components/PilotDelta";
import { LeadMagnet } from "@/components/LeadMagnet";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { faqPageGraph, jsonLdScript } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageGraph) }}
      />
      <Hero />
      <Marquee />
      <WhyNow />
      <Process />
      <SignalsPreview />
      <Pricing />
      <PilotDelta />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </>
  );
}
