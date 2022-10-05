/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
  },
  images: {
    domains: ["images.unsplash.com", "cdn-icons-png.flaticon.com"],
  },
};

module.exports = nextConfig;
