import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  redirects: async () => {
    return [{ source: "/", destination: "/workHistory", permanent: true }];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md/,
      use: [
        {
          loader: "raw-loader",
          options: {
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
