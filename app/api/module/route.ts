import { NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Module from "@/models/Module";
import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, courseId } = await req.json();

    if (!title || !courseId) {
      return NextResponse.json(
        { error: "Title and courseId are required" },
        { status: 400 }
      );
    }

    const module = await Module.create({
      title,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { modules: module._id },
    });

    return NextResponse.json({ module }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create module" },
      { status: 500 }
    );
  }
}