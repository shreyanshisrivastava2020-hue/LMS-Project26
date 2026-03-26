'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  image: string;
  progress: number; // %
  totalLessons: number;
  completedLessons: number;
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("myCourses");

    if (stored) {
      setCourses(JSON.parse(stored));
    } else {
      // Dummy enrolled courses
      const dummyCourses: Course[] = [
        {
          _id: "1",
          title: "Full Stack Web Development",
          instructor: "John Doe",
          image: "https://source.unsplash.com/600x400/?coding",
          progress: 65,
          totalLessons: 40,
          completedLessons: 26,
        },
        {
          _id: "2",
          title: "React & Next.js Mastery",
          instructor: "Jane Smith",
          image: "https://source.unsplash.com/600x400/?reactjs",
          progress: 30,
          totalLessons: 30,
          completedLessons: 9,
        },
      ];

      setCourses(dummyCourses);
      localStorage.setItem("myCourses", JSON.stringify(dummyCourses));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Courses
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Continue learning from where you left off
          </p>
        </div>

        {/* Empty State */}
        {courses.length === 0 ? (
          <div className="bg-white border rounded-xl p-10 text-center">
            <p className="text-gray-500">
              You are not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-sm transition"
              >
                {/* Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {course.instructor}
                    </p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <span>{course.progress}%</span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() =>
                        router.push(`/learn/${course._id}`)
                      }
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Continue Learning
                    </button>

                    <button
                      onClick={() =>
                        router.push(`/courses/${course._id}`)
                      }
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}