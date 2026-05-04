import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";

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

    // Get enrolled courses
    const enrollments = await Enrollment.find({ userId })
      .populate("courseId");

    // Get ALL courses (no filtering)
    const allCourses = await Course.find().limit(6);

    return NextResponse.json({
      stats: {
        enrolled: enrollments.length,
        completed: enrollments.filter(e => e.progress === 100).length,
        inProgress: enrollments.filter(e => e.progress < 100).length,
      },

      
      courses: enrollments.map((e) => ({
        cid: e.courseId._id.toString(),
        title: e.courseId.title,
        progress: e.progress,
      })),

      
      recommended: allCourses.map((c) => ({
        cid: c._id.toString(),
        title: c.title,
        desc: c.description || "Recommended course",
      })),
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" });
  }
}