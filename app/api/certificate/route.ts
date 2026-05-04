import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { courseId } = await req.json();

    const token = (await cookies()).get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token!, secret);

    const userId = (payload as any).id;

    const enrollment = await Enrollment.findOne({ userId, courseId });

    const percent = enrollment.quizScore;

    if (percent < 75) {
      return NextResponse.json({ error: "Not eligible" });
    }

    enrollment.certificateIssued = true;
    await enrollment.save();

    return NextResponse.json({
      message: "Certificate generated 🎉",
    });

  } catch {
    return NextResponse.json({ error: "Error" });
  }
}