import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns:  [{
      hostname: "www.datocms-assets.com"
    }]
  },
};

export default nextConfig;
