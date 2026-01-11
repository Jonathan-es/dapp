import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'export',
  images: { unoptimized: true },
  basePath: '/dapp',
};

export default nextConfig;
