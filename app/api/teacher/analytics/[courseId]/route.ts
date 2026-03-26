import Enrollment from "@/models/Enrollement";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  await connectDB();

  const enrollments: any[] = await Enrollment.find({
    courseId: params.courseId,
  });

  const totalStudents = enrollments.length;

  const completed = enrollments.filter(
    (e: any) => e.progress === 100
  ).length;

  const avgScore =
    enrollments.length > 0
      ? enrollments.reduce(
          (acc: number, e: any) => acc + (e.score || 0),
          0
        ) / enrollments.length
      : 0;

  const completionRate =
    totalStudents > 0
      ? (completed / totalStudents) * 100
      : 0;

  return NextResponse.json({
    totalStudents,
    completionRate,
    avgScore,
  });
}