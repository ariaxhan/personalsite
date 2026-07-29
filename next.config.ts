import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
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
              name(module: any, chunks: any) {
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
