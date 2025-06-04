import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  dest: "public",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  ...withPWA({
    dest: 'public',
  })
}

export default nextConfig
