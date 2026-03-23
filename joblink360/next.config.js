/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure dynamic routes don't break static generation
  output: 'standalone', 
}

module.exports = nextConfig
