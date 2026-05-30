import type { Metadata } from "next";
import { Archivo, Big_Shoulders, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PersistentAuditStrip } from "@/components/PersistentAuditStrip";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { organizationGraph, jsonLdScript } from "@/lib/jsonld";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signalled.studio"),
  title: {
    default: "signal* - AEO websites for B2B SaaS, six days flat",
    template: "%s · signal*",
  },
  description:
    "A productised AEO build for seed–series A B2B SaaS. We score 18 signals, ship the fix in six days, verify +15 before handoff. $2,490 flat.",
  openGraph: {
    title: "signal* - AEO websites for B2B SaaS",
    description: "Six days. 18 signals. Same two operators on every build. $2,490 flat.",
    url: "https://signalled.studio",
    siteName: "signal*",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "signal* - AEO websites for B2B SaaS",
    description: "Six days. 18 signals. $2,490 flat.",
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
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <PersistentAuditStrip />
          <ExitIntentModal />
        </div>
      </body>
    </html>
  );
}
