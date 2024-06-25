/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/manage',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
