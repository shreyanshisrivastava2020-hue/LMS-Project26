import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";

connect();

export async function GET() {
  try {
    // ⚠️ Replace with real auth later
    const instructorId = "69a04457ee208df438ebc88b";

    // ✅ Get instructor courses
    const courses = await Course.find({
      instructor: instructorId,
    }).populate("enrolledStudents", "name email");

    let totalEarnings = 0;
    let totalStudents = 0;

    const courseStats: any[] = [];
    const transactions: any[] = [];

    courses.forEach((course: any) => {
      const studentCount = course.enrolledStudents.length;
      const earnings = studentCount * (course.price || 0);

      totalEarnings += earnings;
      totalStudents += studentCount;

      // ✅ Course-wise earnings
      courseStats.push({
        title: course.title,
        students: studentCount,
        earnings: `$${earnings}`,
      });

      // ✅ Fake transactions (until payment system added)
      course.enrolledStudents.forEach((student: any) => {
        transactions.push({
          student: student.name,
          course: course.title,
          amount: `$${course.price || 0}`,
          date: new Date(course.createdAt).toDateString(),
        });
      });
    });

    // ✅ Monthly earnings (mock simple split)
    const thisMonth = Math.floor(totalEarnings * 0.2);

    return NextResponse.json({
      stats: {
        totalEarnings: `$${totalEarnings}`,
        thisMonth: `$${thisMonth}`,
        totalStudents,
        pendingPayout: `$${Math.floor(totalEarnings * 0.1)}`,
      },
      courses: courseStats,
      transactions,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching earnings data" },
      { status: 500 },
    );
  }
}
