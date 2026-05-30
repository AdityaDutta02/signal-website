import type { Metadata } from "next";
import { MethodologyView } from "@/components/MethodologyView";
import { faqPageGraph, rubricHowToGraph, jsonLdScript } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "methodology · the 18-signal rubric",
  description:
    "Signal's published 4-block, 18-signal AEO rubric. Block A entity (×1.5), B on-page, C content, D off-site (×1.4). Raw max 115, normalised /100, +15 ship floor.",
  alternates: { canonical: "https://signalled.studio/methodology" },
};

export default function MethodologyPage() {
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
