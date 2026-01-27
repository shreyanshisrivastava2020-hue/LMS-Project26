import { NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB(); // connect to DB

    const courses = await Course.find({}); // fetch all courses

    // convert _id to string for frontend
    const normalizedCourses = courses.map(course => ({
      ...course.toObject(),
      _id: course._id.toString(),
    }));

    return NextResponse.json(normalizedCourses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
