import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Serve static assets directly to avoid Vercel Image Optimization transformation quotas.
    unoptimized: true,
    // AVIF rompe la transparencia (fondo negro) en PNGs con alpha (catálogo Grundfos); solo webp.
    formats: ["image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
