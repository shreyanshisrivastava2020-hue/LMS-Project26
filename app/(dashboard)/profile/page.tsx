"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="space-y-6">
      {/* 🔹 HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your learning and personal details
          </p>
        </div>
        <Button size="sm">Edit Profile</Button>
      </div>

      {/* 🔹 TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 👤 PROFILE CARD */}
        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
              JD
            </div>

            <div>
              <h2 className="font-medium">John Doe</h2>
              <p className="text-sm text-gray-500">john@email.com</p>
            </div>
          </CardContent>
        </Card>

        {/* 📊 STATS */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Courses", value: 12, icon: BookOpen },
            { label: "Completed", value: 5, icon: Award },
            { label: "Hours", value: "48h", icon: Clock },
            { label: "Progress", value: "72%", icon: TrendingUp },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={i}
                className="rounded-xl border hover:shadow-sm transition"
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <h3 className="text-sm font-semibold">{item.value}</h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 📚 COURSES */}
        <Card className="rounded-2xl border shadow-sm lg:col-span-2">
          <CardContent className="p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-600">
              Enrolled Courses
            </h2>

            {["React Bootcamp", "Node Mastery", "AI Basics"].map(
              (course, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
                >
                  <span className="text-sm">{course}</span>
                  <span className="text-xs text-gray-500">In Progress</span>
                </div>
              ),
            )}
          </CardContent>
        </Card>

        {/* 🏆 CERTIFICATES */}
        <Card className="rounded-2xl border shadow-sm">
          <CardContent className="p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-600">
              Certificates
            </h2>

            <div className="text-sm text-gray-500">2 Certificates earned</div>

            <Button size="sm" variant="outline">
              View Certificates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 ACTIVITY */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-600">
            Recent Activity
          </h2>

          {[
            "Completed React Basics",
            "Started Node.js Course",
            "Earned Certificate",
          ].map((item, i) => (
            <div
              key={i}
              className="text-sm text-gray-600 border-b pb-2 last:border-none"
            >
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 🔹 COMPACT PERSONAL INFO */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600">Personal Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="First Name" defaultValue="John" />
            <Input placeholder="Last Name" defaultValue="Doe" />
            <Input placeholder="Phone" defaultValue="+91 9876543210" />
          </div>

          <div className="flex justify-end">
            <Button size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
