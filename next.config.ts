import type { NextConfig } from "next";

// next.config.ts
const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: [], // Add required image domains
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
