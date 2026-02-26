import { NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Course from "@/models/Course";
import UserProgress from "@/models/UserProgress";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const { userId } = await req.json();

    const course = await Course.findOne({ slug: params.slug });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Prevent duplicate enrollment
    if (course.studentsEnrolled.includes(userId)) {
      return NextResponse.json(
        { message: "Already enrolled" }
      );
    }

    // Add student to course
    course.studentsEnrolled.push(userId);
    await course.save();

    // Create progress record
    await UserProgress.create({
      user: userId,
      course: course._id,
      completedLessons: [],
      progressPercentage: 0,
    });

    return NextResponse.json({
      message: "Enrollment successful",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Enrollment failed" },
      { status: 500 }
    );
  }
}