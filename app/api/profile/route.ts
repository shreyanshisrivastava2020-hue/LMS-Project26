import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import User from "@/models/users";
import Enrollment from "@/models/Enrollment";
import "@/models/Course"; // ✅ FIX

export async function GET() {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const userId = (payload as any).id;

    const user = await User.findById(userId).select("-password");

    const enrollments = await Enrollment.find({ userId })
      .populate("courseId");

    const courses = enrollments.map((e: any) => ({
      title: e.courseId?.title || "Untitled",
      progress: e.progress || 0,
    }));

    return NextResponse.json({ user, courses });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" });
  }
}