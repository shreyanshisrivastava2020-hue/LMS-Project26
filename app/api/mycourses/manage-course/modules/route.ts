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
    const { modules } = await request.json();
    if (!modules) {
      return NextResponse.json(
        { error: "Modules are required" },
        { status: 400 },
      );
    }

    const updateCourse = await Course.updateOne(
      { _id: courseId, "modules._id": modules._id },
      {
        $set: {
          "modules.$.title": modules.title || "No module title",
          "modules.$.description":
            modules.description || "No module description",
        },
      },
      {
        arrayFilters: [{ "mod._id": modules._id }],
      },
    );
    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Module updated successfully",
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
    const { modules } = await request.json();
    if (!modules) {
      return NextResponse.json(
        { error: "Modules are required" },
        { status: 400 },
      );
    }
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          modules: modules,
        },
      },
      { new: true },
    );
    if (!updateCourse) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      message: "Module added successfully",
      data: updateCourse,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
