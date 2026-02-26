'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  _id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  image?: string;
  lessons?: {
    title: string;
    videoUrl: string;
    pdfUrl: string;
  }[];
}

export default function CourseDashboard() {
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Category');
  const [level, setLevel] = useState('Sort by level');
  const [sortBy, setSortBy] = useState('az');

  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  // FETCH COURSES FROM DB
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();

        // Handle both response formats safely
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
        }

      } catch (error) {
        console.error('Failed to fetch courses', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  //  ENROLL FUNCTION
  const handleEnroll = async (course: Course) => {
    try {
      if (course.price === 0) {
        const res = await fetch('/api/users/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId: course._id }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Enrollment failed');
          return;
        }

        setEnrolledCourses((prev) => [...prev, course._id]);
        return;
      }

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Order creation failed');
        return;
      }

      router.push(`/checkout/${data.orderId}`);

    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  //  SAFE FILTER LOGIC
  const filteredCourses = useMemo(() => {
    let filtered = Array.isArray(courses) ? [...courses] : [];

    if (search) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'Category') {
      filtered = filtered.filter((c) => c.category === category);
    }

    if (level !== 'Sort by level') {
      filtered = filtered.filter((c) => c.level === level);
    }

    if (sortBy === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [courses, search, category, level, sortBy]);

  const totalCourses = enrolledCourses.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-gray-600 mt-1">
          Manage, search and continue your learning journey
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Enrolled</p>
          <h2 className="text-2xl font-bold mt-2">{totalCourses}</h2>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search courses..."
            className="border rounded-lg px-4 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Category</option>
            <option>Programming</option>
            <option>Web Development</option>
            <option>Database</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Sort by level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="az">Sort A-Z</option>
          </select>
        </div>
      </div>

      {/* COURSE GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course._id);

          return (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={course.image || '/placeholder.jpg'}
                alt={course.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">
                  {course.title}
                </h3>

                <p className="text-gray-500 text-sm mb-3">
                  {course.instructor}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{course.lessons?.length || 0} lessons</span>
                  <span>{course.level}</span>
                </div>

                {!isEnrolled && (
                  <p className="text-sm font-semibold mb-2 text-gray-700">
                    {course.price === 0
                      ? "Free Course"
                      : `₹${course.price}`}
                  </p>
                )}

                <div className="flex justify-between items-center mt-3">
                  {isEnrolled ? (
                    <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm">
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      {course.price === 0 ? "Enroll Free" : "Enroll Now"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}