import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return !!session;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Failed fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, imageUrl, category, readTime, authorName, authorRole, authorImage } = body;

    if (!title || !content || !category || !authorName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if blog exists
    const existing = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Generate new slug if title changed
    let slug = existing.slug;
    if (title !== existing.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
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
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error("Failed to update blog:", error);
    return NextResponse.json({ error: "Failed to update blog", details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
