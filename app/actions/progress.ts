"use server";

import connectDB from "@/app/lib/auth/mongodb";
import UserProgress from "@/models/UserProgress";

export async function markLessonComplete(
  userId: string,
  courseId: string,
  lessonId: string
) {
  await connectDB();

  let progress = await UserProgress.findOne({
    userId,
    courseId,
  });

  if (!progress) {
    progress = await UserProgress.create({
      userId,
      courseId,
      completedLessons: [lessonId],
    });
  } else {
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      await progress.save();
    }
  }

  return { success: true };
}
