/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rules: [
    {
      test: /\.(ts|tsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
  ],
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
