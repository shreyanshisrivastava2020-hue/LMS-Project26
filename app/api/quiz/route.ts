import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { courseId, score } = await req.json();

    const token = (await cookies()).get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token!, secret);

    const userId = (payload as any).id;

    const enrollment = await Enrollment.findOne({ userId, courseId });

    enrollment.quizScore = score;

    await enrollment.save();

    return NextResponse.json({ message: "Quiz saved" });

  } catch (err) {
    return NextResponse.json({ error: "Quiz error" });
  }
}