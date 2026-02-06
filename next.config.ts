import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Supabase ke sabhi link allow karo
      },
    ],
  },
};

export default nextConfig;
