import { MetadataRoute } from "next";

export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "https://www.mixspacestudio.com/sitemap.xml",
  };
}

export default robots;
