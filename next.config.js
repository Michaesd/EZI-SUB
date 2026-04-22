/** @type {import('next').NextConfig} */
const nextConfig = {
  // 我们只保留这一行，其他什么都不要！
  // 它清晰地告诉Next.js，这是一个输出给独立服务器（比如Cloudflare）的优化版本。
  output: "standalone",
};

module.exports = nextConfig;
