import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  { key: "Content-Signal", value: "ai-train=no, ai-input=yes, search=yes" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' *.cloudflareinsights.com; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.cloudflareinsights.com https://app.cal.com; frame-src 'self' https://app.cal.com https://cal.com; connect-src 'self' *.cloudflareinsights.com https://app.cal.com https://cal.com;",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  experimental: {
    // Two render-blocking stylesheets cost 326ms and pushed mobile LCP to 4.1s
    // against a text element whose render delay was 93% of the metric. The CSS
    // is only ~10KB combined, so inlining it removes both requests outright.
    // Measured 2026-07-28, see _meta/research/2026-07-28-discoverability-audit.md.
    inlineCss: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [
          ...securityHeaders,
          {
            key: "Link",
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-card.json>; rel="https://a2a-protocol.org/rel/agent-card", </.well-known/mcp/server-card.json>; rel="https://modelcontextprotocol.io/rel/server-card", </.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index", </llms.txt>; rel="https://llmstxt.org/rel/index", </sitemap.xml>; rel="sitemap"',
          },
        ],
      },
      {
        source: "/edit/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/api/cms/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 50,
          maxInitialRequests: 50,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module: { context?: string }) {
                // next/font and other virtual modules have no node_modules path.
                const match = module.context?.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                );
                if (!match) return 'vendor';
                return `npm.${match[1].replace('@', '')}`;
              },
              priority: 20,
            },
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);

initOpenNextCloudflareForDev();
