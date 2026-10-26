const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  transpilePackages: ["next-mdx-remote"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },

  // Sitemap is force-dynamic and runs in a Vercel function. NFT does not
  // follow the runtime readdir of src/content/blog, so include those files
  // explicitly for sitemap + blog routes.
  outputFileTracingIncludes: {
    "/sitemap": ["./src/content/blog/**/*.md"],
    "/sitemap.xml": ["./src/content/blog/**/*.md"],
    "/blog": ["./src/content/blog/**/*.md"],
    "/blog/[slug]": ["./src/content/blog/**/*.md"],
  },
  
  async headers() {
    return [
      {
        source: "/products/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
