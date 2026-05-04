export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/models/users";

export async function GET() {
  try {
    await connectDB();

    // ✅ Get token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    // ✅ SAFE VERIFY (VERY IMPORTANT)
    let decoded: any;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ✅ Fetch user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error: any) {
    console.error("ME API ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}