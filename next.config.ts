import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/blog/:slug.html", destination: "/blog/:slug", permanent: true },
    ];
  },
  async headers() {
    const headers = [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
    if (process.env.NOINDEX) {
      headers.push({
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      });
    }
    return headers;
  },
};

export default config;
