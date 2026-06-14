import { PdfMarqueeBar } from "@/components/PdfMarqueeBar";
import { Hero } from "@/components/Hero";
import { PilotDelta } from "@/components/PilotDelta";
import { Pricing } from "@/components/Pricing";
import {
  faqPageGraph,
  organizationGraph,
  rubricHowToGraph,
  jsonLdScript,
} from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(rubricHowToGraph) }}
      />

      <PdfMarqueeBar />
      <Hero />
      <PilotDelta />
      <Pricing />
    </>
  );
}
