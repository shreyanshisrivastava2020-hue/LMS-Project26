import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const allcourses = await Course.find({});
    if (!allcourses) {
      return NextResponse.json({ error: "No course found" }, { status: 400 });
    }

    const response = NextResponse.json({
      message: "Got all courses",
      success: true,
      allcourses,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
