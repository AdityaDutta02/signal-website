import type { Metadata } from "next";
import { MethodologyView } from "@/components/MethodologyView";
import { faqPageGraph, rubricHowToGraph, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "the 18-signal AEO rubric",
  description:
    "The published 4-block, 18-signal rubric Signal uses to gate every engagement. Block A entity (×1.5), B on-page, C content, D off-site (×1.4). +15 ship floor.",
  alternates: { canonical: "https://signalled.studio/rubric" },
};

export default function RubricPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(rubricHowToGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageGraph) }}
      />
      <MethodologyView />
    </>
  );
}
