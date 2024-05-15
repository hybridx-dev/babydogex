/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ipfs.io',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'metadata.wojax.xyz',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }

export default nextConfig;
