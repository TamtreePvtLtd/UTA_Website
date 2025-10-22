import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landingPage',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/invoices/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
