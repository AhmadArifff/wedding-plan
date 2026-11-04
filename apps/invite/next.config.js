/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@nikahplan/ui',
    '@nikahplan/db',
    '@nikahplan/invitation-blocks',
    'lucide-react',
  ],
  reactStrictMode: true,
};

module.exports = nextConfig;
