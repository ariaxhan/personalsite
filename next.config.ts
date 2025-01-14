import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from "next";
import type { Module } from 'webpack';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [],
  },
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Aggressive code splitting and optimization
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 50,
          maxInitialRequests: 50,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name(module: Module) {
                const packageName = module.context?.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1] || 'vendor';
                return `vendor.${packageName.replace('@', '')}`;
              },
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Additional size optimizations
      config.performance = {
        ...config.performance,
        maxEntrypointSize: 25000,
        maxAssetSize: 25000,
        hints: 'error',
      };
    }

    return config;
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);
