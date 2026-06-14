import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "signal* - AEO websites for B2B SaaS, six days, $2,490 flat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F5F0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          fontFamily: "system-ui",
          color: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* corner pink squares */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 18, height: 18, background: "#FF1F6A" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 18, height: 18, background: "#FF1F6A" }} />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#0A0A0A",
          }}
        >
          <span style={{ width: 12, height: 12, background: "#FF1F6A", display: "block" }} />
          <span>signal*</span>
          <span style={{ color: "#6B6B68" }}>/</span>
          <span>aeo · 18 signals · 6 days · $2,490</span>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 64,
            fontSize: 132,
            lineHeight: 0.92,
            letterSpacing: -2,
            fontWeight: 900,
          }}
        >
          <span>chatgpt can&apos;t</span>
          <span>
            find your site<span style={{ color: "#FF1F6A" }}>.</span>
          </span>
          <span>
            we fix it<span style={{ color: "#FF1F6A" }}>.</span>
          </span>
        </div>

        {/* footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginTop: "auto",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6B6B68",
          }}
        >
          <span>signalled.studio</span>
          <span style={{ color: "#FF1F6A" }}>day-7 re-scan</span>
        </div>
      </div>
    ),
    size,
  );
}
