import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";

connect();
export async function DELETE(request: NextRequest) {
  try {
    const courseId = request.nextUrl.searchParams.get("id");

    if (!courseId) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    await Course.findByIdAndDelete(courseId);

    return NextResponse.json(
      { success: true, message: "Course deleted permanently" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
