"use client";

import { BookOpen, Clock, BarChart3, User, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Course = {
  _id: string;
  title: string;
  description?: string;
  level?: string;
  duration?: string;
  rating?: number;
  enrolledStudents?: any[];
  category?: string;
};

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const router = useRouter();

  // ✅ SAFE NORMALIZER (MAIN FIX)
  const normalize = (val: any) =>
    (val || "").toString().trim().toLowerCase();

  // ✅ MAP LEVEL
  const mapLevel = (lvl: any) => {
    const l = normalize(lvl);

    if (l.includes("beginner")) return "Beginner";
    if (l.includes("intermediate")) return "Intermediate";
    if (l.includes("advanced")) return "Advanced";

    return "";
  };

  // ✅ MAP CATEGORY
  const mapCategory = (cat: any) => {
    const c = normalize(cat);

    if (c.includes("web")) return "Web";
    if (c.includes("cs")) return "CS";

    return "";
  };

  // ✅ ENROLL FUNCTION
  const handleEnroll = async (courseId: string) => {
    try {
      setLoadingId(courseId);

      const response = await fetch("/api/course/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Enroll failed");
      }

      toast.success(data.message || "Enrolled successfully!");
      router.push(`/courseplay?courseId=${courseId}`);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ FETCH COURSES
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course/getCourses");
        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data.allcourses ?? data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchCourses();
  }, []);

  // ✅ FILTER LOGIC (SAFE)
  const filteredCourses = courses.filter((course) => {
    const searchMatch =
      !search ||
      normalize(course.title).includes(normalize(search));

    const levelMatch =
      !level || mapLevel(course.level) === level;

    const categoryMatch =
      !category || mapCategory(course.category) === category;

    return searchMatch && levelMatch && categoryMatch;
  });

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
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

          {/* Search */}
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 rounded-lg border px-4 py-2"
          />

          {/* Level */}
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="CS">CS</option>
            <option value="Web">Web</option>
          </select>
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="border rounded-xl p-6 hover:shadow-md"
            >
              <span className="text-xs text-indigo-600">
                {mapCategory(course.category) || "General"}
              </span>

              <h2
                className="text-xl font-semibold mt-2 cursor-pointer"
                onClick={() =>
                  router.push(`/coursedesc/${course._id}`)
                }
              >
                {course.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                {course.description || "No description"}
              </p>

              <div className="flex flex-wrap gap-3 text-sm mt-4">
                <span><BarChart3 size={14} /> {mapLevel(course.level) || "N/A"}</span>
                <span><Clock size={14} /> {course.duration || "N/A"}</span>
                <span><User size={14} /> {course.enrolledStudents?.length || 0}</span>
                <span><Star size={14} /> {course.rating || 0}</span>
              </div>

              <button
                disabled={loadingId === course._id}
                onClick={() => handleEnroll(course._id)}
                className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {loadingId === course._id ? "Processing..." : "Enroll"}
              </button>
            </div>
          ))}
        </div>

        {/* Empty */}
        {filteredCourses.length === 0 && (
          <p className="text-center mt-10 text-gray-500">
            No courses found
          </p>
        )}
      </main>
    </div>
  );
}