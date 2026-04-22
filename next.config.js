/** @type {import('next').NextConfig} */
const nextConfig = {
  // 在 Vercel 部署，我们不需要 output: 'standalone'，删掉它反而更稳定
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
