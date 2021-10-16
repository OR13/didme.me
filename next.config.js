/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { nftTracing: true },
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
  },

  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: "/api/:path*",
        has: [
          {
            type: "header",
            key: "accept",
            value: `application/(?<didRepresentation>.*)`,
          },
        ],
      },
    ];
  },
};
