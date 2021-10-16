/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { outputFileTracing: true },

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
