import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return !!session;
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("Failed fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, imageUrl, category, readTime, authorName, authorRole, authorImage } = body;

    if (!title || !content || !category || !authorName) {
      return NextResponse.json({ error: "Missing required fields (title, content, category, authorName)" }, { status: 400 });
    }

    // Generate slug
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Check if slug exists, if so append random string
    const existing = await prisma.blog.findUnique({
      where: { slug: baseSlug },
    });
    
    const slug = existing ? `${baseSlug}-${crypto.randomBytes(3).toString("hex")}` : baseSlug;

    const newBlog = await prisma.blog.create({
      data: {
        id: crypto.randomUUID(),
        title,
        slug,
        excerpt: excerpt || "",
        content,
        imageUrl: imageUrl || null,
        category,
        readTime: readTime || "5 min read",
        authorName,
        authorRole: authorRole || null,
        authorImage: authorImage || null,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json(newBlog);
  } catch (error: any) {
    console.error("Failed to create blog:", error);
    return NextResponse.json({ error: "Failed to create blog", details: error.message }, { status: 500 });
  }
}
