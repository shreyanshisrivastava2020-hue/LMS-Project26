import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Course from "@/models/Course";
import { Types } from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, category, price, thumbnail } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Title, description, and category are required" },
        { status: 400 }
      );
    }

    // Generate slug from title
    let slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Ensure slug uniqueness by adding a random suffix
    const random = Math.floor(Math.random() * 10000);
    const slug = `${slugBase}-${random}`;

    // Temporary instructor ID (for testing)
    const dummyInstructor = new Types.ObjectId();

    // Create course (draft recommended)
    const newCourse = await Course.create({
      title,
      slug,
      description,
      category,
      price: price || 0,
      thumbnail: thumbnail || "",
      instructor: dummyInstructor,
      status: "draft",     // draft first
      isPublished: false,  // teacher can publish later
    });

    return NextResponse.json({
      success: true,
      course: newCourse,
    });

  } catch (error: any) {
    console.error("CREATE COURSE ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}