/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rules: [
    { 
      test: /\.(ts|tsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }
  ]
};

export default nextConfig;
