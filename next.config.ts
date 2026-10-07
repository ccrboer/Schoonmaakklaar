import type { NextConfig } from "next";

/**
 * De canonieke productie-URL is https://schoonmaakklaar.be, zonder www.
 * Deze redirect vangt bezoekers en bots op die toch op www binnenkomen.
 *
 * Zet in Vercel schoonmaakklaar.be als primair domein en www.schoonmaakklaar.be
 * als redirect; deze regel is de tweede vangnet, ook buiten Vercel.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.schoonmaakklaar.be" }],
        destination: "https://schoonmaakklaar.be/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
