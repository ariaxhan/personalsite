import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
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
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `npm.${packageName.replace('@', '')}`;
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
