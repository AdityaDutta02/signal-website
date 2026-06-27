import { HeroV5 } from "@/components/HeroV5";
import { ShiftSection } from "@/components/ShiftSection";
import { ProofSection } from "@/components/ProofSection";
import { PricingSection } from "@/components/PricingSection";
import { HowFAQ } from "@/components/HowFAQ";
import { FoundersStrip } from "@/components/FoundersStrip";
import { FinalCTA } from "@/components/FinalCTA";
import { organizationGraph, jsonLdScript } from "@/lib/jsonld";

/**
 * Home v5 — seven sections, one purpose: book the call.
 *
 * S1 Hero          — floating engine logos, rotating brand word, primary CTA
 * S2 Shift         — half-section, 71% stat with mark highlight
 * S3a Proof        — three linked case studies
 * S3b Pricing      — dedicated dark section, "Become AI visible for $2,490."
 * S4 How+FAQ       — five abstracted steps + three friction-killing FAQs
 * S5 Founders      — half-section, two operators, results-led credibility
 * S6 Final CTA     — dark, the only CTA on the page when it's in view
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationGraph) }}
      />
      <HeroV5 />
      <ShiftSection />
      <ProofSection />
      <PricingSection />
      <HowFAQ />
      <FoundersStrip />
      <FinalCTA />
    </>
  );
}
