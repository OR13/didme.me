/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: false,
  experimental: {
    nftTracing: true,
    outputFileTracing: true,
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
