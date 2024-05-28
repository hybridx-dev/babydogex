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
    webpack: (config) => {
      // web3modal
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      
      return config;
    },
  }

export default nextConfig;
