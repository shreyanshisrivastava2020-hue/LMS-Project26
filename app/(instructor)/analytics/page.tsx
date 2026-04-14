"use client";
import { useEffect, useState } from "react";
import { Users, BookOpen, TrendingUp, Star, Eye } from "lucide-react";

export default function InstructorAnalytics() {
  type CourseType = {
    title: string;
    students: number;
    rating: number;
    completion: number;
    lessons: number;
    updated: string;
  };

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({});
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [topCourses, setTopCourses] = useState<any[]>([]);
  const [ratingBreakdown, setRatingBreakdown] = useState<any[]>([]);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/instructor/analytics");
        const data = await res.json();

        setStats(data?.stats || {});
        setCourses(data?.courseAnalytics || []);
        setTopCourses(data?.topCourses || []);
        setRatingBreakdown(data?.ratingBreakdown || []);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);
  if (loading) {
    return <div className="p-8 text-gray-500">Loading analytics...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>

            <p className="text-gray-500 text-sm">
              Track performance of your courses and students
            </p>
          </div>

          <select className="border rounded-lg px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 12 months</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h2 className="text-2xl font-bold">
                {stats?.totalStudents || 0}
              </h2>
              <p className="text-green-600 text-xs">+12% from last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <BookOpen className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Courses</p>
              <h2 className="text-2xl font-bold">{stats?.totalCourses || 0}</h2>
              <p className="text-gray-400 text-xs">Active courses</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Average Rating</p>
              <h2 className="text-2xl font-bold">{stats?.avgRating || 0}</h2>
              <p className="text-gray-400 text-xs">Across all courses</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <h2 className="text-2xl font-bold">
                {stats?.completionRate || 0}%
              </h2>
              <p className="text-green-600 text-xs">+5% improvement</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Student Enrollment Trend
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Enrollment Chart (Recharts)
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Revenue Chart
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Top Courses */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-6">
              Top Performing Courses
            </h2>

            <table className="w-full text-sm">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="text-left py-2">Course</th>
                  <th>Students</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>
                {topCourses.map((course, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{course.title}</td>
                    <td>{course.students}</td>
                    <td>⭐ {course.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-6">Rating Breakdown</h2>

            <div className="space-y-4 text-sm">
              {[
                { star: "5 ⭐", percent: 70, color: "bg-green-500" },
                { star: "4 ⭐", percent: 20, color: "bg-blue-500" },
                { star: "3 ⭐", percent: 7, color: "bg-yellow-500" },
                { star: "2 ⭐", percent: 2, color: "bg-orange-500" },
                { star: "1 ⭐", percent: 1, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-10">{item.star}</span>

                  <div className="flex-1 bg-gray-200 h-2 rounded">
                    <div
                      className={`${item.color} h-2 rounded`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>

                  <span>{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Analytics Table */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Course Analytics</h2>

            <input
              placeholder="Search courses..."
              className="border rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="text-left py-3">Course</th>
                  <th>Students</th>
                  <th>Lessons</th>
                  <th>Rating</th>
                  <th>Completion</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 font-medium">{course.title}</td>

                    <td>{course.students}</td>

                    <td>{course.lessons}</td>

                    <td>⭐ {course.rating}</td>

                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 h-2 rounded">
                          <div
                            className="bg-green-500 h-2 rounded"
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>

                        <span>{course.completion}%</span>
                      </div>
                    </td>

                    <td>{course.updated}</td>

                    <td>
                      <button className="flex items-center gap-1 text-indigo-600 hover:underline">
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
