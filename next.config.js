/** @type {import('next').NextConfig} */
const NEXT_URL = process.env.NEXT_URL;
const API_URI = process.env.API_URI;

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_URL: NEXT_URL,
    API_URI: API_URI,
  },
}

module.exports = nextConfig
