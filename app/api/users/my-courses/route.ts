import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/mongodb";
import UserProgress from "@/models/UserProgress";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    // ✅ FIX 1: Await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ FIX 2: Verify token safely
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    // ✅ Get enrolled courses
    const progress = await UserProgress.find({
      userId: decoded.id,
    });

    const courseIds = progress.map((p) => p.courseId);

    // ✅ FIX 3: Convert to ObjectId if needed
    const courses = await Course.find({
      _id: { $in: courseIds },
    });

    return NextResponse.json(courses);

  } catch (error: any) {
    console.error("My Courses Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}