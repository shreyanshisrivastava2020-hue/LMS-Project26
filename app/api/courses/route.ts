import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find({}).lean();

    return NextResponse.json(courses); // ✅ return array directly

  } catch (error) {
    console.error("GET COURSES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}