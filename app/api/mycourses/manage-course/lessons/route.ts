import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const { lessons } = await request.json();
    if (!lessons) {
      return NextResponse.json(
        { error: "Lessons are required" },
        { status: 400 },
      );
    }
    const updateCourse = await Course.updateOne(
      {
        _id: courseId,
        "modules.lessons._id": lessons._id,
        "modules._id": lessons.moduleId,
      },
      {
        $set: {
          "modules.$[mod].lessons.$[les].title":
            lessons.title || "No lesson title provided",
          "modules.$[mod].lessons.$[les].description":
            lessons.description || "No lesson description provided",
          "modules.$[mod].lessons.$[les].url": lessons.url || "No lesson URL",
          "modules.$[mod].lessons.$[les].type": lessons.type || "video",
          "modules.$[mod].lessons.$[les].isPreview": lessons.isPreview || false,
        },
      },
      {
        arrayFilters: [
          { "mod._id": lessons.moduleId },
          { "les._id": lessons._id },
        ],
      },
    );

    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Lesson updated successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const { lessons } = await request.json();

    if (!lessons) {
      return NextResponse.json(
        { error: "Lessons are required" },
        { status: 400 },
      );
    }
    const updateCourse = await Course.updateOne(
      { _id: courseId, "modules._id": lessons.moduleId },
      {
        $push: {
          "modules.$[mod].lessons": lessons,
        },
      },
      {
        arrayFilters: [{ "mod._id": lessons.moduleId }],
      },
    );
    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Lesson added successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
