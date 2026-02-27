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

  const progressData = await UserProgress.find({
    user: new mongoose.Types.ObjectId(decoded.id),
  }).lean();

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
      (p: any) => p.course.toString() === course._id.toString()
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
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome,{" "}
            <span className="text-blue-600">{decoded.username}</span> 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Here’s your learning overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <StatCard
            title="Enrolled Courses"
            value={enrolledCoursesCount.toString()}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <StatCard
            title="Completed Courses"
            value={completedCoursesCount.toString()}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <StatCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            bgColor="bg-purple-100"
            textColor="text-purple-600"
          />
        </div>

        {/* Continue Learning Section */}
        {continueLearning ? (
          <section>
            <h2 className="text-xl font-semibold mb-6">
              Continue Learning
            </h2>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">

              {/* Thumbnail */}
              <div className="md:w-1/3 h-64 bg-gray-200">
                <img
                  src={
                    continueLearning.image ||
                    "https://via.placeholder.com/600x400?text=Course+Thumbnail"
                  }
                  alt={continueLearning.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {continueLearning.title}
                  </h3>

                  <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${continueLearning.percent}%`,
                      }}
                    />
                  </div>

                  <p className="text-gray-600">
                    {continueLearning.percent}% completed
                  </p>
                </div>

                <Link
                  href={`/course/${continueLearning._id}`}
                  className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                  Resume Course
                </Link>
              </div>

            </div>
          </section>
        ) : (
          <div className="bg-white p-10 rounded-xl text-center shadow-sm">
            <p className="text-gray-500">
              You are not enrolled in any courses yet.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}