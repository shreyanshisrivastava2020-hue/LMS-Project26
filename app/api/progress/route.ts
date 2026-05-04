import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { courseId, lessonIndex } = await req.json();

    const token = (await cookies()).get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token!, secret);

    const userId = (payload as any).id;

    const enrollment = await Enrollment.findOne({ userId, courseId });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" });
    }

    // ✅ add lesson
    if (!enrollment.completedLessons.includes(lessonIndex)) {
      enrollment.completedLessons.push(lessonIndex);
    }

    // ✅ update progress %
    const totalLessons = 5; // dynamic later
    enrollment.progress =
      (enrollment.completedLessons.length / totalLessons) * 100;

    await enrollment.save();

    return NextResponse.json({ message: "Progress saved" });

  } catch (err) {
    return NextResponse.json({ error: "Error saving progress" });
  }
}