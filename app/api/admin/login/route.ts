import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, username: admin.username });

    // Set a simple authentication cookie (valid for 7 days)
    response.cookies.set("admin_session", admin.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
