import { merge } from "webpack-merge";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "cloudflare-ipfs.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  eslint: {
    dirs: ["app", "libs"],
  },
  webpack(config) {
    return merge(config, {
      module: {
        rules: [
          {
            resourceQuery: /raw/,
            type: "asset/source",
          },
        ],
      },
    });
  },
};

export default nextConfig;
