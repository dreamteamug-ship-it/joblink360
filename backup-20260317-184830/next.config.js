/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Handle async server components
  experimental: {
    serverComponentsExternalPackages: [
      'puppeteer-core',
      '@sparticuz/chromium-min'
    ]
  },
  // Ignore TypeScript errors during build (temporary)
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
