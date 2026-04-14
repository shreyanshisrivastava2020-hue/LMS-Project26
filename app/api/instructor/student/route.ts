import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import User from "@/models/users";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "User id required" },
        { status: 400 },
      );
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (user.role !== "instructor") {
      return NextResponse.json(
        { message: "Only instructor are allowed" },
        { status: 401 },
      );
    }

    // Get instructor courses + students
    const courses = await Course.find({ instructor: userId }).populate(
      "enrolledStudents",
      "name email status",
    );

    let students: any[] = [];

    courses.forEach((course) => {
      course.enrolledStudents.forEach((student: any) => {
        students.push({
          name: student.name,
          email: student.email,
          status: student.status,
          course: course.title,
        });
      });
    });

    return NextResponse.json(
      {
        message: "Students fetched successfully",
        data: students,
        stats: {
          totalStudents: students.length,
          activeLearners: students.length,
          totalCourses: courses.length,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching students" },
      { status: 400 },
    );
  }
}
