/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // CSP is intentionally loose for inline JSON-LD scripts + Next.js inline runtime.
  // Tighten with nonces post-launch if/when analytics or third-party widgets land.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https://api.linkedin.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Long cache for static asset surfaces
      { source: "/favicon.svg", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
      { source: "/wordmark.svg", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
    ];
  },
  async redirects() {
    return [
      // /401 alias is generated as a route file; redirect to canonical
      { source: "/audit/", destination: "/audit", permanent: true },
    ];
  },
};

export default nextConfig;
