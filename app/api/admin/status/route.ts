import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const adminCount = await prisma.admin.count();
    return NextResponse.json({ hasAdmin: adminCount > 0 });
  } catch (error: any) {
    console.error("Failed checking admin count:", error);
    return NextResponse.json({ error: "Failed to check status", details: error.message }, { status: 500 });
  }
}
