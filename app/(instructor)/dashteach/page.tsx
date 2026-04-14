"use client";

import { Users, BookOpen, Star, TrendingUp, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InstructorDashboard() {
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
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/mycourses");
        const { data } = await response.json();
        setCourses(data);
        console.log("Courses:", data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

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

        {/* Stats Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="text-indigo-600" size={24} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h2 className="text-2xl font-bold">
                {courses.reduce(
                  (total, course) => total + course.enrolledStudents.length,
                  0,
                ) || 0}
              </h2>
              <p className="text-green-600 text-xs">+12% this month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <BookOpen className="text-indigo-600" size={24} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Courses</p>
              <h2 className="text-2xl font-bold">{courses.length}</h2>
              <p className="text-gray-400 text-xs">Active courses</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="text-yellow-500" size={24} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Average Rating</p>
              <h2 className="text-2xl font-bold">
                {courses.length > 0
                  ? (
                      courses.reduce((sum, course) => sum + course.rating, 0) /
                      courses.length
                    ).toFixed(1)
                  : 0}
              </h2>
              <p className="text-gray-400 text-xs">Across all courses</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <h2 className="text-2xl font-bold">{0}%</h2>
              <p className="text-green-600 text-xs">{"+5% improvement"}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Courses */}

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-6">Your Courses</h2>

            <div className="space-y-5">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">{course.title}</p>

                    <p className="text-sm text-gray-500">
                      {course.enrolledStudents.length || 0} students
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">⭐ {course.rating}</p>

                    <p className="text-xs text-gray-400">
                      Updated {course.updatedAt?.split("T")[0] || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/createcourse">
                <button className="bg-indigo-50 text-indigo-700 p-4 rounded-lg w-full hover:bg-indigo-100 transition text-sm font-medium">
                  Create New Course
                </button>
              </Link>

              <Link href="/my-courses">
                <button className="bg-green-50 w-full text-green-700 p-4 rounded-lg hover:bg-green-100 transition text-sm font-medium">
                  Manage Courses
                </button>
              </Link>

              <Link href="/analytics">
                <button className="bg-yellow-50 w-full text-yellow-700 p-4 rounded-lg hover:bg-yellow-100 transition text-sm font-medium">
                  View Analytics
                </button>
              </Link>

              <Link href="/teacherProfile">
                <button className="bg-purple-50 w-full text-purple-700 p-4 rounded-lg hover:bg-purple-100 transition text-sm font-medium">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
