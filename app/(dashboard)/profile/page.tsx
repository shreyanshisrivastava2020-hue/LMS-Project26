"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

export default function UserProfile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile"); // ✅ FIXED API
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-5">Loading...</div>;
  if (!data) return <div className="p-5">No data</div>;

  const user = data.user;
  const courses = data.courses || [];

  const firstName = user?.name?.split(" ")[0] || "";
  const lastName = user?.name?.split(" ")[1] || "";

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your learning and personal details
          </p>
        </div>
        <Button size="sm">Edit Profile</Button>
      </div>

      {/* PROFILE CARD */}
      <Card>
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
            {firstName ? firstName[0] : "U"}
          </div>

          <div>
            <h2 className="font-medium">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen size={16} />
            <div>
              <p className="text-xs text-gray-500">Courses</p>
              <h3 className="font-semibold">{courses.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Award size={16} />
            <div>
              <p className="text-xs text-gray-500">Completed</p>
              <h3 className="font-semibold">
                {courses.filter((c: any) => c.progress === 100).length}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock size={16} />
            <div>
              <p className="text-xs text-gray-500">Hours</p>
              <h3 className="font-semibold">--</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp size={16} />
            <div>
              <p className="text-xs text-gray-500">Progress</p>
              <h3 className="font-semibold">
                {courses.length
                  ? Math.round(
                      courses.reduce(
                        (acc: number, c: any) => acc + c.progress,
                        0
                      ) / courses.length
                    )
                  : 0}
                %
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* COURSES */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600">
            Enrolled Courses
          </h2>

          {courses.length > 0 ? (
            courses.map((c: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <span>{c.title}</span>
                <span className="text-xs text-gray-500">
                  {c.progress}%
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No courses</p>
          )}
        </CardContent>
      </Card>

      {/* PERSONAL INFO */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600">
            Personal Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input value={firstName} readOnly />
            <Input value={lastName} readOnly />
            <Input value={user.phone || ""} readOnly />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}