"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, IndianRupee, Plus } from "lucide-react";
import toast from "react-hot-toast";

type Course = {
  _id?: string;
  title: string;
  description: string;
  enrolledStudents: string[];
  price: number;
  isPublished: boolean;
  thumbnail: {
    url: string;
  };
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
};

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const deleteCourse = async (courseId: string) => {
    try {
      const res = await fetch(`/api/mycourses?courseId=${courseId}`, {
        method: "DELETE",
      });
      const { message } = await res.json();
      toast.success(message);

      console.log(message);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      toast.error("Error deleting course:");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/mycourses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>

          <Link
            href="/createcourse"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Create New Course
          </Link>
        </div>

        {/* No Courses */}
        {courses.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <BookOpen className="mx-auto mb-4 text-gray-400" size={40} />
            <h2 className="text-lg font-semibold text-gray-700">
              No Courses Created Yet
            </h2>
            <p className="text-gray-500 mt-2">
              Start building your first course and share your knowledge.
            </p>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gray-200">
                <img
                  src={
                    course.thumbnail?.url || "/images/softwaredevelopment.jpg"
                  }
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    {course.enrolledStudents.length || 0}
                  </div>

                  <div className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {course.price || 0}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>

                  <span className="flex items-center gap-1">
                    <Link
                      href={`/my-courses/manage/?courseId=${course._id}`}
                      className="flex items-center bg-blue-600 text-sm hover:bg-blue-700 transition text-white px-2 py-1 rounded-md shadow-sm font-semibold"
                    >
                      Manage
                    </Link>
                    <button
                      onClick={() => deleteCourse(course._id!)}
                      className="flex items-center bg-red-600 text-sm hover:bg-red-700 transition text-white px-2 py-1 rounded-md shadow-sm font-semibold"
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
