import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow importing from src via @ alias (configured in tsconfig)
};

export default nextConfig;
