export const dynamic = "force-static"; // <--- ADD THIS AT THE TOP

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tremblenull.pages.dev/sitemap.xml", // (if you have one)
  };
}