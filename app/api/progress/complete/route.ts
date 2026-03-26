import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectDB from "@/app/lib/mongodb";
import UserProgress from "@/models/UserProgress";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const { courseId, lessonIndex } = await req.json();

    let progress = await UserProgress.findOne({
      userId: decoded.id,
      courseId
    });

    if (!progress) {
      progress = new UserProgress({
        userId: decoded.id,
        courseId,
        completedLessons: [],
        lastLesson: 0
      });
    }

    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
    }

    progress.lastLesson = lessonIndex;

    await progress.save();

    return NextResponse.json({ success: true });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );

  }
}