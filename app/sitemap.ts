import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/blogs";

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const blogUrls = blogs.map((blog) => ({
    url: `https://www.mixspacestudio.com/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/studio", "/contact", "/blogs"].map((route) => ({
    url: `https://www.mixspacestudio.com${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes, ...blogUrls];
}

export default sitemap;
