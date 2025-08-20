/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  // Handle build-time errors gracefully
  experimental: {
    // Allow build to continue even if some pages fail
    missingSuspenseWithCSRError: false,
  },
  // Configure static generation
  output: "standalone",
};

export default nextConfig;
