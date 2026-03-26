import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongodb";
import UserProgress from "@/models/UserProgress";
import Course from "@/models/Course";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // 🔐 Get token
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔐 Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    const userId = decoded.id;

    // 📦 Get courseId
    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID required" },
        { status: 400 }
      );
    }

    // 🔎 Check course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // 🔎 Check already enrolled
    const existing = await UserProgress.findOne({
      user: new mongoose.Types.ObjectId(userId),
      course: new mongoose.Types.ObjectId(courseId),
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already enrolled" },
        { status: 200 }
      );
    }

    // ✅ CREATE PROGRESS (MATCHING SCHEMA)
    const newProgress = await UserProgress.create({
      user: new mongoose.Types.ObjectId(userId),
      course: new mongoose.Types.ObjectId(courseId),
      completedLessons: [],
    });

    return NextResponse.json(
      {
        message: "Enrollment successful",
        progress: newProgress,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("ENROLL ERROR:", error);
    return NextResponse.json(
      { message: "Enrollment failed", error: error.message },
      { status: 500 }
    );
  }
}