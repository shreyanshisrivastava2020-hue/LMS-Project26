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

    // 🎯 Get all instructor courses
    const courses = await Course.find({ instructor: userId })
      .populate("enrolledStudents", "name email")
      .lean();

    // 🔢 Total Courses
    const totalCourses = courses.length;

    // 👥 Total Students (unique)
    const studentSet = new Set();
    courses.forEach((course) => {
      course.enrolledStudents.forEach((s: any) =>
        studentSet.add(s._id.toString()),
      );
    });
    const totalStudents = studentSet.size;

    // ⭐ Average Rating
    const avgRating =
      totalCourses > 0
        ? (
            courses.reduce((acc, c) => acc + (c.rating || 0), 0) / totalCourses
          ).toFixed(1)
        : 0;

    // 📊 Completion Rate (FAKE for now → replace later with progress model)
    const completionRate = Math.floor(Math.random() * 30) + 60; // 60–90%

    // 📚 Course Analytics Data
    const courseAnalytics = courses.map((course) => ({
      title: course.title,
      students: course.enrolledStudents.length,
      lessons: course.modules.reduce(
        (acc: number, mod: any) => acc + mod.lessons.length,
        0,
      ),
      rating: course.rating || 0,
      completion: Math.floor(Math.random() * 30) + 60, // TEMP
      updated: new Date(course.updatedAt).toDateString(),
    }));

    // 🏆 Top Courses (sorted by students)
    const topCourses = [...courseAnalytics]
      .sort((a, b) => b.students - a.students)
      .slice(0, 3);

    // 📊 Rating Breakdown (FAKE → later calculate from reviews)
    const ratingBreakdown = [
      { star: "5 ⭐", percent: 70 },
      { star: "4 ⭐", percent: 20 },
      { star: "3 ⭐", percent: 7 },
      { star: "2 ⭐", percent: 2 },
      { star: "1 ⭐", percent: 1 },
    ];

    return NextResponse.json({
      stats: {
        totalStudents,
        totalCourses,
        avgRating,
        completionRate,
      },
      courseAnalytics,
      topCourses,
      ratingBreakdown,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
