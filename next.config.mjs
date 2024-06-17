import { merge } from "webpack-merge";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**/*",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
  eslint: {
    dirs: ["app", "modules"],
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
