"use client";

import { BookOpen, Clock, BarChart3, User, Star } from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Course = {
  _id: number;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  enrolledStudents: [];
  category: string;
};

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const filter = {
    level: "",
    category: "",
  };

  //TODO : Implement filtering and searching
  const handleChange = () => {};

  const handleEnroll = async (courseId: string) => {
    try {
      const reponse = await fetch(`/api/course/enroll?courseId=${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message } = await reponse.json();
      // const { data } = await reponse.json();

      // console.log(data);

      toast.success(message);
    } catch (error: any) {
      toast.error("Error occured");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course/getCourses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        console.log(data);
        setCourses(data.allcourses ?? data);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-slate-600 mt-1">
            Explore the complete Computer Science curriculum
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full md:w-1/3 rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            className="rounded-lg border border-slate-300 px-4 py-2"
            onChange={handleChange}
            value={filter.category}
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            className="rounded-lg border border-slate-300 px-4 py-2"
            onChange={handleChange}
            value={filter.level}
          >
            <option>All Categories</option>
            <option>Core CS</option>
            <option>Systems</option>
            <option>Web</option>
            <option>AI</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="rounded-xl border hover:cursor-pointer shadow:md border-slate-200 bg-white p-6 hover:shadow-md transition"
            >
              {/* 🔥 Report Button (TOP RIGHT) */}
              <div className="absolute top-4 right-4"></div>
              <span className="text-xs font-medium text-indigo-600">
                {course.category}
              </span>

              <h2
                className="text-xl font-semibold hover:underline mt-2"
                onClick={() => {
                  router.push(`/coursedesc/${course._id}`);
                }}
              >
                {course.title}
              </h2>

              <p className="text-slate-600 text-sm mt-2">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
                <div className="flex items-center gap-1">
                  <BarChart3 size={16} />
                  {course.level}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  {course.enrolledStudents?.length || 0}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="" />
                  {course.rating}
                </div>
              </div>

              {/* Progress */}
              {/* <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div> */}

              <button
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition px-4 py-2 font-medium"
                onClick={() => {
                  router.push(`/courseplay?courseId=${course._id}`);
                  handleEnroll(`${course._id}`);
                }}
              >
                <BookOpen size={18} />
                Enroll
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
