/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
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
