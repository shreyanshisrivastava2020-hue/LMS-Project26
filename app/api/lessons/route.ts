import { NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Lesson from "@/models/Lesson";
import Module from "@/models/Module";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      title,
      moduleId,
      videoUrl,
      pdfUrl,
      content,
      duration,
      order,
      isPreview,
    } = await req.json();

    if (!title || !moduleId) {
      return NextResponse.json(
        { error: "Title and moduleId are required" },
        { status: 400 }
      );
    }

    const lesson = await Lesson.create({
      title,
      module: moduleId,
      videoUrl,
      pdfUrl,
      content,
      duration,
      order,
      isPreview,
    });

    await Module.findByIdAndUpdate(moduleId, {
      $push: { lessons: lesson._id },
    });

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}