/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://YOUR-PROJECT-REF.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "YOUR-ANON-KEY-HERE",
  },
};
module.exports = nextConfig;
