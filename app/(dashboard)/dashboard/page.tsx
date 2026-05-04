"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UserDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          credentials: "include",
        });

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  const courses = data?.courses || [];
  const recommended = data?.recommended || [];

  const continueCourses = courses.filter((c: any) => c.progress < 100);
  const completedCourses = courses.filter((c: any) => c.progress === 100);

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-500 text-sm">
          Continue your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Enrolled</p>
            <h2 className="text-3xl">{courses.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-3xl">{completedCourses.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="text-3xl">{continueCourses.length}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Continue Learning
        </h2>

        {continueCourses.length === 0 ? (
          <p className="text-gray-500">No active courses</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {continueCourses.map((c: any, i: number) => (
              <Card key={i}>
                <CardContent className="p-5 space-y-4">
                  <h3 className="text-lg">{c.title}</h3>

                  <Progress value={c.progress} />

                  <Link href={`/coursedesc/${c.cid}`}>
                    Continue →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recommended */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Recommended
        </h2>

        {recommended.length === 0 ? (
          <p className="text-gray-500">No recommendations</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {recommended.map((c: any, i: number) => (
              <Card key={i}>
                <CardContent className="p-5 space-y-2">
                  <h3>{c.title}</h3>

                  <Link href={`/coursedesc/${c.cid}`}>
                    View →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Completed Courses
        </h2>

        {completedCourses.length === 0 ? (
          <p className="text-gray-500">No completed courses</p>
        ) : (
          <div className="space-y-2">
            {completedCourses.map((c: any, i: number) => (
              <div key={i}>{c.title}</div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}