import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ['@venia/react', '@venia/core', '@venia/theme-default'],
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  }
};

export default nextConfig;
