import type { NextConfig } from "next"

const cfUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL as string

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(cfUrl).hostname,
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
