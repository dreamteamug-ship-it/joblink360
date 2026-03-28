/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        '../joblink360-mobile/**',
        'joblink360-mobile/**',
        '**/*.dll',
        '**/*.sql'
      ]
    }
  }
};
export default nextConfig;
