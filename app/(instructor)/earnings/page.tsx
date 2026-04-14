"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Users, Clock } from "lucide-react";

export default function InstructorEarnings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await fetch("/api/instructor/earning");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading earnings...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Earnings</h1>
        <p className="text-gray-500">Track your revenue and payouts</p>
      </div>

      {/* Earnings Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <DollarSign size={20} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mt-3">
            {data?.stats?.totalEarnings || "$0"}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">This Month</p>
            <TrendingUp size={20} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mt-3">
            {data?.stats?.thisMonth || "$0"}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Total Students</p>
            <Users size={20} className="text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold mt-3">
            {data?.stats?.totalStudents || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Pending Payout</p>
            <Clock size={20} className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold mt-3">
            {data?.stats?.pendingPayout || "$0"}
          </h2>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl border shadow-sm mb-10">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>

        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          Chart will go here
        </div>
      </div>

      {/* Course Earnings Table */}
      <div className="bg-white rounded-xl border shadow-sm mb-10">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Earnings by Course</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-4">Course</th>
              <th className="p-4">Students</th>
              <th className="p-4">Earnings</th>
            </tr>
          </thead>

          <tbody>
            {data?.courses?.length > 0 ? (
              data.courses.map((course: any, index: number) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{course.title}</td>
                  <td className="p-4">{course.students}</td>
                  <td className="p-4 font-semibold text-green-600">
                    {course.earnings}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-gray-500" colSpan={3}>
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Purchases</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.transactions?.length > 0 ? (
              data.transactions.map((tx: any, index: number) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-4">{tx.student}</td>
                  <td className="p-4">{tx.course}</td>
                  <td className="p-4 font-semibold text-green-600">
                    {tx.amount}
                  </td>
                  <td className="p-4 text-gray-500">{tx.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-gray-500" colSpan={4}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
