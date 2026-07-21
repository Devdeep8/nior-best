import { prisma } from "@/lib/prisma";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  category: string;
  readTime: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  authorName: string;
  authorRole: string | null;
  authorImage: string | null;
}

const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";


function withImageFallback<T extends { imageUrl: string | null }>(blog: T): T {
  return blog.imageUrl ? blog : { ...blog, imageUrl: FALLBACK_IMAGE_URL };
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
    return (blogs as BlogPost[]).map(withImageFallback);
  } catch (error) {
    console.error("Failed to fetch blogs from database:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (blog) return withImageFallback(blog as BlogPost);

    return null;
  } catch (error) {
    console.error(`Failed to fetch blog by slug ${slug}:`, error); 
    return null;
  }
}