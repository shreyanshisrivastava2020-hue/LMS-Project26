// app/api/progress/route.ts
import connectDB from "@/app/lib/mongodb";
import UserProgress from "@/models/UserProgress";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { userId, courseId, lessonIndex } = await req.json();

  let progress = await UserProgress.findOne({ userId, courseId });

  if (!progress) {
    progress = await UserProgress.create({
      userId,
      courseId,
      completedLessons: [lessonIndex],
      progress: 10,
    });
  } else {
    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
      progress.progress = progress.completedLessons.length * 10;
      await progress.save();
    }
  }

  return NextResponse.json(progress);
}