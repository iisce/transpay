/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
     dest: "public",
     disable:
          process.env.NODE_ENV === "development"
});
module.exports = withPWA({
     swcMinify: true,
     reactStrictMode: true,
     typescript: {
          ignoreBuildErrors: false,
     },
     eslint: {
          ignoreDuringBuilds: true,
     },
     images: {
          remotePatterns: [
               {
                    protocol: 'https',
                    hostname: '**',
                    port: '',
                    pathname: '/**'
               }
          ]
     },
     experimental: {
          serverActions: true
     }
});
