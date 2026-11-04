/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nikahplan/ui', '@nikahplan/db', '@nikahplan/invitation-blocks'],
  reactStrictMode: true,
};

module.exports = nextConfig;

