/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,
  //発火回数を制限
}

module.exports = nextConfig
