/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactCompiler: true, // Temporarily disabled for debugging
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  /* 
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          ...
        ]
      }
    ]
  } 
  */
};

export default nextConfig;
