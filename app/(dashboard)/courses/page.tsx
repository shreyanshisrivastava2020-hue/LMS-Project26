'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
}

function difficultyColor(level: string) {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-700';
    case 'intermediate': return 'bg-yellow-100 text-yellow-700';
    case 'advanced': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

const capitalize = (text?: string) =>
  text ? text[0].toUpperCase() + text.slice(1) : '';

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success) setCourses(data.courses);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading courses...</div>;
  if (!courses.length) return <div className="p-6 text-center">No courses found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={course.thumbnail || '/default-course.jpg'}
              alt={course.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {course.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor(course.difficulty)}`}>
                  {capitalize(course.difficulty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
