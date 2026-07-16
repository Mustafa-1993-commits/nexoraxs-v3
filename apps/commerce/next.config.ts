import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@nexoraxs/contracts", "@nexoraxs/sdk", "@nexoraxs/ui"],
};

export default nextConfig;
