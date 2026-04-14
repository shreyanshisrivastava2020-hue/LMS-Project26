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

    //TODO: Update the course with the new module and lessons using array filters to target the specific module and lesson to update. If the module or lesson does not exist, it will be added to the course.
    const updateCourse = await Course.updateOne(
      { _id: courseId },
      {
        $set: {
          "modules.$.title": modules.title || "No module title",
          "modules.$.description":
            modules.description || "No module description",
          "modules.$[mod].lessons.$[lesson]": [
            {
              title: modules.lessons.title || "No lesson title",
              description:
                modules.lessons.description || "No lesson description",
              url: modules.lessons.url || "No URL",
              type: modules.lessons.type || "video",
              isPreview: modules.lessons.isPreview || false,
            },
          ],
          arrayfilters: [
            { "mod._id": modules._id },
            { "lesson._id": modules.lessons._id },
          ],
        },
      },
      { upsert: true },
    );

    return NextResponse.json({
      message: "Module added successfully",
      data: updateCourse,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }
    const course = await Course.findById(courseId).populate(
      "instructor",
      "name email",
    );
    return NextResponse.json({
      message: "Course details fetched successfully",
      data: course,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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
    const body = await request.json();
    const { modules } = body;
    if (!modules) {
      return NextResponse.json(
        { error: "Modules are required" },
        { status: 400 },
      );
    }

    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId, "modules._id": modules._id },
      {
        $push: {
          modules: modules,
          "modules.$.lessons": modules.lessons,
        },
      },
      { new: true },
    );
    return NextResponse.json({
      message: "Module added successfully",
      data: updateCourse,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
