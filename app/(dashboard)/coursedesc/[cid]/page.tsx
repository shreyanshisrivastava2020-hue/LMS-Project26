"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [course, setCourse] = useState<any>(null);

  const params = useParams();

  // ✅ Fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${params.cid}`);

        const data = await res.json();

        console.log("frontend:", params);

        if (!res.ok) {
          console.log(data.message);
          return;
        }

        setCourse(data.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    if (params?.cid) fetchCourse();
  }, [params?.cid]);

  // ✅ Loading state
  if (!course) {
    return <div className="p-10 text-center">Loading course...</div>;
  }

  // ✅ Calculate total duration
  const totalMinutes = course.modules.reduce(
    (acc: number, mod: any) =>
      acc + mod.lessons.reduce((a: number, l: any) => a + l.duration, 0),
    0,
  );

  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HERO */}
      <div className="relative h-72 w-full">
        <Image
          src={course.thumbnail || "/images/softwaredevelopment.jpg"}
          alt="course"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">{course.title}</h1>

            <p className="mt-4 text-gray-200">
              Created by{" "}
              <Link href="#" className="underline">
                {course.instructor}
              </Link>
            </p>

            <p className="mt-2 text-sm text-gray-300">
              ⏱ {totalHours} hours of content
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Description */}
        <div className="bg-white rounded-xl border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">About this course</h2>
          <p className="text-slate-600">{course.description}</p>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {course.modules.map((mod: any, i: number) => {
            const moduleMinutes = mod.lessons.reduce(
              (a: number, l: any) => a + l.duration,
              0,
            );

            return (
              <div key={i} className="bg-white rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {i + 1}. {mod.title}
                </h3>

                <p className="text-sm text-slate-600 mb-3">{mod.desc}</p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    {mod.lessons.length} Lessons •{" "}
                    {(moduleMinutes / 60).toFixed(1)} hrs
                  </span>

                  <button
                    onClick={() => setOpenModule(openModule === i ? null : i)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {openModule === i ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {openModule === i && (
                  <div className="mt-4 border-t pt-4 space-y-2">
                    {mod.lessons.map((lesson: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between bg-slate-50 px-4 py-2 rounded-lg"
                      >
                        <p className="text-sm">
                          {idx + 1}. {lesson.name}
                        </p>
                        <span className="text-xs text-slate-500">
                          {lesson.duration} min
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
