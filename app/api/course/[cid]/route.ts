import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import "@/models/users";

connect();

export async function GET(req: NextRequest, context: any) {
  try {
    const params = await context.params;
    const { cid } = params;

    if (!cid) {
      return NextResponse.json(
        { success: false, message: "Course ID missing" },
        { status: 400 },
      );
    }

    const course = await Course.findById(cid)
      .populate("instructor", "name")
      .lean();

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    const modules = course.modules.map((mod: any) => ({
      title: mod.title,
      desc: mod.description,
      lessons: mod.lessons.map((lesson: any) => ({
        name: lesson.title,
        duration: lesson.duration || 0,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail?.url || "",
        instructor: course.instructor?.name || "Unknown",
        description: course.description,
        level: course.level,
        modules,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch course" },
      { status: 500 },
    );
  }
}
