import connectDB from "@/app/lib/mongodb";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params;

    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}