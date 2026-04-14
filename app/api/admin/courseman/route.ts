import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";

connect();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const id = searchParams.get("id"); // 🔥 important

    // ✅ VIEW SINGLE COURSE
    if (id) {
      const course = await Course.findById(id)
        .populate("instructor", "name email")
        .select("-__v");

      if (!course) {
        return NextResponse.json(
          { success: false, message: "Course not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        data: course, // 🔥 includes description
      });
    }

    // ✅ LIST COURSES (your existing)
    const courses = await Course.find({
      title: { $regex: search, $options: "i" },
    })
      .populate("instructor", "name")
      .sort({ createdAt: -1 });

    const formattedCourses = courses.map((course: any) => ({
      _id: course._id,
      title: course.title,
      instructor: course.instructor?.name || "Unknown",
      price: course.price,
      isFree: course.price === 0,
      students: course.enrolledStudents?.length || 0,
    }));

    return NextResponse.json({
      success: true,
      data: formattedCourses,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
}
