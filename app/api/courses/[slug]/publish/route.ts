import { NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Course from "@/models/Course";

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const course = await Course.findOneAndUpdate(
      { slug: params.slug },
      {
        status: "published",
        isPublished: true,
      },
      { new: true }
    );

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to publish course" },
      { status: 500 }
    );
  }
}