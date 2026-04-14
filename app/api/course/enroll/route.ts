import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import User from "@/models/users";
import mongoose, { ObjectId } from "mongoose";

connect();
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const courseId = request.nextUrl.searchParams.get("courseId");
    if (!userId) {
      return NextResponse.json(
        { message: "User id required" },
        { status: 400 },
      );
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (user.role !== "student") {
      return NextResponse.json(
        { message: "Only students are allowed to enroll" },
        { status: 401 },
      );
    }

    // const duplicate = await Course.findOne({
    //   enrolledStudents: new mongoose.Types.ObjectId(userId),
    // }).select("-password");

    // if (duplicate) {
    //   return NextResponse.json(
    //     { message: "Already enrolled in the course" },
    //     { status: 400 },
    //   );
    // }

    // Get instructor courses + students
    const enrolledCourse = await Course.updateOne(
      {
        _id: courseId,
      },
      {
        $addToSet: {
          enrolledStudents: userId,
        },
      },
    );

    return NextResponse.json(
      {
        message: `Enrolled in course successfully`,
        data: enrolledCourse,
      },

      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error enrolling in course",
      },
      { status: 400 },
    );
  }
}
