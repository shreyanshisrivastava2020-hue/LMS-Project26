import { NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Course from "@/models/Course";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const course = await Course.findOne({ slug: params.slug })
      .populate({
        path: "modules",
        populate: {
          path: "lessons",
        },
      });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }


    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
/*put api*/

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const body = await req.json();

    const course = await Course.findOneAndUpdate(
      { slug: params.slug },
      body,
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
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}