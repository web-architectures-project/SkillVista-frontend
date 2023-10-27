/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/user-dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
