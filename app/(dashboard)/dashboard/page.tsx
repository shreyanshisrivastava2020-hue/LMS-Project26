"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UserDashboard() {
  const courses = [
    {
      title: "React Bootcamp",
      progress: 75,
    },
    {
      title: "Node.js Mastery",
      progress: 40,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-500">Continue your learning journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Enrolled Courses</p>
            <h2 className="text-2xl font-semibold">12</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-2xl font-semibold">5</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="text-2xl font-semibold">7</h2>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-medium">{course.title}</h3>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-medium">Course Title {i + 1}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Short description of the course
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
