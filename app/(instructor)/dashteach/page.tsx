"use client";

import { Users, BookOpen, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Course = {
  _id?: string;
  title: string;
  description: string;
  enrolledStudents: string[];
  price: number;
  rating: number;
  isPublished: boolean;
  thumbnail?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  updatedAt?: string;
};

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/mycourses");
        const result = await response.json();

        // ✅ FIX: ensure array always
        setCourses(Array.isArray(result?.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // fallback safe state
      }
    };

    fetchCourses();
  }, []);

  const totalStudents = (courses ?? []).reduce(
    (total, course) => total + (course?.enrolledStudents?.length || 0),
    0
  );

  const avgRating =
    courses.length > 0
      ? (
          courses.reduce((sum, course) => sum + (course.rating || 0), 0) /
          courses.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Instructor Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Welcome back! Here's an overview of your courses
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {/* Students */}
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h2 className="text-2xl font-bold">{totalStudents}</h2>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <BookOpen className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Courses</p>
              <h2 className="text-2xl font-bold">{courses.length}</h2>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Average Rating</p>
              <h2 className="text-2xl font-bold">{avgRating}</h2>
            </div>
          </div>

          {/* Growth */}
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <h2 className="text-2xl font-bold">0%</h2>
            </div>
          </div>

        </div>

        {/* Courses List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Your Courses</h2>

          <div className="space-y-5">
            {(courses ?? []).map((course, index) => (
              <div
                key={course._id || index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {course.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {course.enrolledStudents?.length || 0} students
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm">⭐ {course.rating || 0}</p>
                  <p className="text-xs text-gray-400">
                    Updated {course.updatedAt?.split("T")[0] || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}