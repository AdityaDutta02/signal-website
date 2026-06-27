import type { Metadata } from "next";
import { Archivo, Big_Shoulders, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { organizationGraph, jsonLdScript } from "@/lib/jsonld";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signalled.studio"),
  title: {
    default: "Make ChatGPT Recommend You · Signal",
    template: "%s · signal*",
  },
  description:
    "We rebuild B2B SaaS sites so ChatGPT, Perplexity, and Gemini recommend you. $2,490, one invoice, run by the two operators on the call.",
  openGraph: {
    title: "Make ChatGPT Recommend You · Signal",
    description: "We rebuild B2B SaaS sites so ChatGPT, Perplexity, and Gemini cite you. $2,490 flat.",
    url: "https://signalled.studio",
    siteName: "signal*",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Make ChatGPT Recommend You · Signal",
    description: "We rebuild B2B SaaS sites so ChatGPT, Perplexity, and Gemini cite you. $2,490 flat.",
    site: "@signalled",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  authors: [{ name: "Aakif" }, { name: "Aditya" }],
  creator: "Signal",
  publisher: "Signal",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${bigShoulders.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationGraph) }}
        />
        <div className="min-h-screen bg-bg text-fg flex flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <ExitIntentModal />
        </div>
      </body>
    </html>
  );
}
