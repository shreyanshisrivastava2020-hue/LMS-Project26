import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/lib/auth/mongodb";
import Enrollment from "@/models/Enrollement";
import Lesson from "@/models/Lesson";
import Module from "@/models/Module";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );

    const { lessonId } = await request.json();

    const lesson = await Lesson.findById(lessonId).populate({
      path: "module",
      populate: { path: "course" },
    });

    const enrollment = await Enrollment.findOne({
      user: decoded.id,
      course: lesson.module.course._id,
    });

    if (!enrollment)
      return NextResponse.json({ message: "Not enrolled" }, { status: 400 });

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    // Calculate progress
    const totalLessons = await Lesson.countDocuments({
      module: { $in: await Module.find({ course: lesson.module.course._id }) },
    });

    enrollment.progress =
      (enrollment.completedLessons.length / totalLessons) * 100;

    await enrollment.save();

    return NextResponse.json(enrollment);

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}