/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }

    return config;
  },
  output: "standalone",
};

export default nextConfig;
