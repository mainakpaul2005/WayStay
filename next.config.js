/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  // Allow loading optimized images from Unsplash (used throughout the landing page)
  images: {
    domains: ['images.unsplash.com'],
    // optionally add remotePatterns for more complex matching
  }
})

module.exports = nextConfig
