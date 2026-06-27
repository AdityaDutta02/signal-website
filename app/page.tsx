import { HeroV5 } from "@/components/HeroV5";
import { ShiftSection } from "@/components/ShiftSection";
import { ProofPricing } from "@/components/ProofPricing";
import { HowFAQ } from "@/components/HowFAQ";
import { FoundersStrip } from "@/components/FoundersStrip";
import { FinalCTA } from "@/components/FinalCTA";
import { organizationGraph, jsonLdScript } from "@/lib/jsonld";

/**
 * Home v5 — six sections, one purpose: book the call.
 *
 * S1 Hero          — floating engine logos, rotating brand word, primary CTA
 * S2 Shift         — half-section, G2 stat with chart bleeding under the boundary
 * S3 Proof+Pricing — three linked case-study rows + "Become AI Visible for $2,490."
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
      <ProofPricing />
      <HowFAQ />
      <FoundersStrip />
      <FinalCTA />
    </>
  );
}
