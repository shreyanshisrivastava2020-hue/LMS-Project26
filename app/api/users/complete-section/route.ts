import { NextRequest, NextResponse } from "next/server";
import Enrollment from "@/models/Enrollement";
import Course from "@/models/Course";
import connectDB from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  await connectDB();
  const { userId, courseId, sectionId } = await req.json();

  const enrollment = await Enrollment.findOne({ userId, courseId });
  const course = await Course.findById(courseId);

  if (!enrollment.completedSections.includes(sectionId)) {
    enrollment.completedSections.push(sectionId);
  }

  enrollment.progress =
    (enrollment.completedSections.length / course.sections.length) * 100;

  await enrollment.save();

  return NextResponse.json({ progress: enrollment.progress });
}