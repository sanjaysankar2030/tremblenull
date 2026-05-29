import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <--- ADD THIS LINE
  images: {
    unoptimized: true, // <--- ALSO ADD THIS FOR STATIC EXPORTS
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

// Cast as any to appease TypeScript for Cloudflare's custom runtime key
export default nextConfig as any;