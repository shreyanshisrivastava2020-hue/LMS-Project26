'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  price: number;
  image?: string;
  rating?: number;
  students?: number;
  level?: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");

    if (stored) {
      setWishlist(JSON.parse(stored));
    } else {
      const dummyCourses: Course[] = [
        {
          _id: "1",
          title: "Full Stack Web Development",
          instructor: "John Doe",
          price: 4999,
          rating: 4.5,
          students: 1200,
          level: "Beginner",
          image: "https://source.unsplash.com/600x400/?coding",
        },
        {
          _id: "2",
          title: "Advanced React & Next.js",
          instructor: "Jane Smith",
          price: 3999,
          rating: 4.7,
          students: 950,
          level: "Intermediate",
          image: "https://source.unsplash.com/600x400/?reactjs",
        },
      ];

      setWishlist(dummyCourses);
      localStorage.setItem("wishlist", JSON.stringify(dummyCourses));
    }
  }, []);

  const removeCourse = (id: string) => {
    const updated = wishlist.filter((c) => c._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Wishlist
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Courses you’ve saved for later
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {wishlist.length === 0 ? (
          <div className="text-center py-20 border rounded-lg bg-white">
            <p className="text-gray-500">
              Your wishlist is currently empty.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {wishlist.map((course) => (
              <div
                key={course._id}
                className="flex bg-white border rounded-xl overflow-hidden hover:shadow-sm transition"
              >
                {/* Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-56 h-36 object-cover"
                />

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 p-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">
                      {course.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {course.instructor}
                    </p>

                    <div className="flex items-center gap-3 text-sm mt-2 text-gray-600">
                      <span>⭐ {course.rating}</span>
                      <span>• {course.students} students</span>
                      <span>• {course.level}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{course.price}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          router.push(`/courses/${course._id}`)
                        }
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        View Course
                      </button>

                      <button
                        onClick={() => removeCourse(course._id)}
                        className="text-sm text-gray-500 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
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