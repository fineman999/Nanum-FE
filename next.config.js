/** @type {import('next').NextConfig} */

// Next PWA build
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = withPWA({
  // reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
    NANUM_USER_SERVICE_BASE_URL: process.env.NANUM_USER_SERVICE_BASE_URL,
    NANUM_HOUSE_SERVICE_BASE_URL: process.env.NANUM_HOUSE_SERVICE_BASE_URL,
    NANUM_ENROLL_SERVICE_BASE_URL: process.env.NANUM_ENROLL_SERVICE_BASE_URL,
    NANUM_WEBFLUX_SERVICE_BASE_URL: process.env.NANUM_WEBFLUX_SERVICE_BASE_URL,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn-icons-png.flaticon.com",
      "nanum-bucket.s3.ap-northeast-2.amazonaws.com",
      "nanum.s3.ap-northeast-2.amazonaws.com",
      "myspharosbucket.s3.ap-northeast-2.amazonaws.com",
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
});

module.exports = nextConfig;
