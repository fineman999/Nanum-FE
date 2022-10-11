/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn-icons-png.flaticon.com",
      "nanum.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  experimental: {
    modularizeImports: {
      "@mui/material/?(((\\w*)?/?)*)": {
        transform: "@mui/material/{{ matches.[1] }}/{{member}}",
      },
      "@mui/icons-material/?(((\\w*)?/?)*)": {
        transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
      },
    },
  },
};

module.exports = nextConfig;
