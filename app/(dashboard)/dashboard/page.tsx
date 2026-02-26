import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";
import mongoose from "mongoose";

import connectDB from "@/app/lib/mongodb";
import UserProgress from "@/models/UserProgress";
import Course from "@/models/Course";
import StatCard from "@/app/components/courses/StatCard";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login to continue.
      </div>
    );
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid session. Please login again.
      </div>
    );
  }

  await connectDB();

  // ✅ MATCH YOUR SCHEMA (user + course)
  const progressData = await UserProgress.find({
    user: new mongoose.Types.ObjectId(decoded.id),
  }).lean();

  // ✅ Extract course IDs correctly
  const courseIds = progressData.map((p: any) => p.course);

  let courses: any[] = [];

  if (courseIds.length > 0) {
    courses = await Course.find({
      _id: { $in: courseIds },
    }).lean();
  }

  const enrolledCoursesCount = courses.length;

  let completedCoursesCount = 0;
  let overallProgress = 0;

  const courseProgressData = courses.map((course: any) => {
    const progress = progressData.find(
      (p: any) =>
        p.course.toString() === course._id.toString()
    );

    const totalLessons = course.totalLessons || 0;

    const completedLessons = Array.isArray(progress?.completedLessons)
      ? progress.completedLessons.length
      : 0;

    const percent =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    if (percent === 100) completedCoursesCount++;

    overallProgress += percent;

    return {
      ...course,
      percent,
    };
  });

  if (enrolledCoursesCount > 0) {
    overallProgress = Math.round(
      overallProgress / enrolledCoursesCount
    );
  }

  const continueLearning = courseProgressData
    .filter((c) => c.percent < 100)
    .sort((a, b) => b.percent - a.percent)[0];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back, {decoded.username}. Here’s your learning overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <StatCard
            title="Enrolled Courses"
            value={enrolledCoursesCount.toString()}
          />
          <StatCard
            title="Completed Courses"
            value={completedCoursesCount.toString()}
          />
          <StatCard
            title="Overall Progress"
            value={`${overallProgress}%`}
          />
        </div>

        {/* Continue Learning */}
        {continueLearning && (
          <section className="mb-14">
            <h2 className="text-xl font-semibold mb-4">
              Continue Learning
            </h2>

            <div className="border rounded-xl p-6 bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-lg font-medium">
                  {continueLearning.title}
                </h3>

                <div className="mt-3 w-full md:w-72 bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{ width: `${continueLearning.percent}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {continueLearning.percent}% completed
                </p>
              </div>

              <Link
                href={`/course/${continueLearning._id}`}
                className="inline-block bg-black text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
              >
                Resume Course
              </Link>
            </div>
          </section>
        )}

        {/* My Courses */}
        <section>
          <h2 className="text-xl font-semibold mb-6">
            My Courses
          </h2>

          {courseProgressData.length === 0 ? (
            <div className="border rounded-xl p-8 text-center bg-white shadow-sm">
              <p className="text-gray-500">
                You are not enrolled in any courses yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courseProgressData.map((course: any) => (
                <div
                  key={course._id}
                  className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-medium mb-4">
                    {course.title}
                  </h3>

                  <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                    <div
                      className="bg-black h-2 rounded-full"
                      style={{ width: `${course.percent}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    {course.percent}% completed
                  </p>

                  <Link
                    href={`/course/${course._id}`}
                    className="text-sm font-medium text-black hover:underline"
                  >
                    View Course →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}