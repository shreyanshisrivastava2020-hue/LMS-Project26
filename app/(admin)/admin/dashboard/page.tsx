"use client";

import { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  Award,
  UserCheck,
} from "lucide-react";

type EnrollmentType = {
  student: string;
  course: string;
  time: string;
};

export default function LMSDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/admin/dashb");
        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        setDashboardData(data.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Platform Live
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 overflow-auto flex-1">
          {!dashboardData ? (
            <p className="text-gray-500">Loading dashboard...</p>
          ) : (
            <>
              {/* 🔥 COLORED STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                  title="Total Students"
                  value={dashboardData.totalStudents}
                  icon={<Users />}
                  color="bg-blue-100 text-blue-600"
                />

                <StatCard
                  title="Total Courses"
                  value={dashboardData.totalCourses}
                  icon={<BookOpen />}
                  color="bg-violet-100 text-violet-600"
                />

                <StatCard
                  title="Active Instructors"
                  value={dashboardData.activeInstructors}
                  icon={<UserCheck />}
                  color="bg-amber-100 text-amber-600"
                />

                <StatCard
                  title="Revenue"
                  value={`₹${dashboardData.totalRevenue}`}
                  icon={<DollarSign />}
                  color="bg-emerald-100 text-emerald-600"
                />
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                {/* Recent Enrollments */}
                <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border p-7">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Recent Enrollments
                  </h2>

                  <div className="space-y-4">
                    {dashboardData?.recentEnrollments?.map(
                      (item: EnrollmentType, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border-b pb-3"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.student}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.course}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {item.time}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Top Courses */}
                <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border p-7">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Top Performing Courses
                  </h2>

                  <div className="space-y-5">
                    {dashboardData?.topCourses?.map(
                      (course: any, i: number) => (
                        <div key={i} className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-800">
                              {course.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {course.enrollments} enrollments
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-emerald-600 font-semibold">
                              {course.completion}%
                            </p>
                            <p className="text-xs text-gray-400">completion</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Extra Stats */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <StatCard
                  title="Active Learners"
                  value={dashboardData.stats.activeNow}
                  icon={<Clock />}
                  color="bg-purple-100 text-purple-600"
                />

                <StatCard
                  title="Certificates Issued"
                  // value={dashboardData.stats.certificates}
                  value={1}
                  icon={<Award />}
                  color="bg-amber-100 text-amber-600"
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-semibold text-gray-900 mt-2">{value}</p>
      </div>

      <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
    </div>
  );
}
