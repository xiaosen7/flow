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
    ],
  },
  eslint: {
    dirs: ["app", "modules"],
  },
};

export default nextConfig;
