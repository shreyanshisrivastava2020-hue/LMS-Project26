"use client";

import { useEffect, useState } from "react";
import { Users, UserCheck, Search, Mail, BookOpen } from "lucide-react";

export default function InstructorStudents() {
  type student = {
    name: string;
    email: string;
    status: string;
    course: string;
  };
  const [students, setStudents] = useState<student[]>([]);
  const [stats, setStats] = useState<any>({});
  const [search, setSearch] = useState("");

  // 🔍 Search filter

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/instructor/student");
        const { data, stats } = await res.json();
        setStudents(data);
        setStats(stats);
      } catch (error: any) {}
    };
    fetchStudents();
  }, []);
  const filteredStudents = (students || []).filter(
    (s) =>
      s?.name?.toLowerCase().includes(search.toLowerCase()) ||
      s?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-1">
            Manage and track your enrolled learners
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700">
          Export Data
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Users className="text-blue-600" />}
          label="Total Students"
          value={stats.totalStudents || 0}
          bg="bg-blue-100"
        />

        <StatCard
          icon={<UserCheck className="text-green-600" />}
          label="Active Learners"
          value={stats.activeLearners || 0}
          bg="bg-green-100"
        />

        <StatCard
          icon={<BookOpen className="text-purple-600" />}
          label="Courses"
          value={stats.totalCourses || 0}
          bg="bg-purple-100"
        />
      </div>

      {/* SEARCH */}
      <div className="bg-white border rounded-xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-6 text-sm text-gray-500 bg-gray-50 px-6 py-4 font-medium">
          <div>Student</div>
          <div>Email</div>
          <div>Course</div>
          <div>Progress</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center px-6 py-5 border-t hover:bg-gray-50 transition"
          >
            {/* NAME */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                {student.name?.charAt(0)}
              </div>

              <span className="font-medium text-gray-900">{student.name}</span>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={14} />
              {student.email}
            </div>

            {/* COURSE */}
            <div className="text-sm text-gray-700">{student.course}</div>

            {/* PROGRESS */}
            <div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${10}%` }}
                />
              </div>

              <span className="text-xs text-gray-500">{10}%</span>
            </div>

            {/* STATUS */}
            <div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  student.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : student.status === "Active"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {student.status}
              </span>
            </div>

            {/* ACTION */}
            <div>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ icon, label, value, bg }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
      <div className={`${bg} p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
