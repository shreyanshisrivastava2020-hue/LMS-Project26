"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function AnalyticsDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$120,450" },
    { title: "Total Users", value: "25,340" },
    { title: "Courses", value: "540" },
    { title: "Completion Rate", value: "68%" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-gray-500">Platform performance insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-5">
              <p className="text-sm text-gray-500">{s.title}</p>
              <h2 className="text-2xl font-semibold">{s.value}</h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardContent className="p-5 h-64 flex items-center justify-center text-gray-400">
            Revenue Chart (Recharts)
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5 h-64 flex items-center justify-center text-gray-400">
            User Growth Chart
          </CardContent>
        </Card>
      </div>

      {/* Course performance */}
      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <h3 className="font-semibold mb-4">Top Performing Courses</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>React Bootcamp</span>
              <span>$12,000</span>
            </div>
            <div className="flex justify-between">
              <span>Node.js Mastery</span>
              <span>$9,500</span>
            </div>
            <div className="flex justify-between">
              <span>AI for Beginners</span>
              <span>$7,200</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
