"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseManagement() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleView = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/courseman?id=${id}`);
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setSelectedCourse(data.data);
      setIsViewOpen(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  // 🔥 Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/courseman?search=${search}`);

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setCourses(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search]);

  // 🔥 Delete Course
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this course?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/courseman/1?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      // ✅ Remove from UI
      setCourses((prev) => prev.filter((c) => c._id !== id));

      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Delete error:", error);
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
        <p className="text-gray-500">Manage and monitor all courses</p>
      </div>
      {/* Search */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="p-5 flex items-center gap-4">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>
      {/* Table */}
      <Card className="rounded-2xl border shadow-sm">
        <CardContent className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="py-3">Course</th>
                <th>Instructor</th>
                <th>Students</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Course */}
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold">{course.title}</span>
                        <span className="text-xs text-gray-400">
                          Updated recently
                        </span>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td>{course.instructor}</td>

                    {/* Students */}
                    <td>{course.students}</td>

                    {/* Price */}
                    <td>
                      {course.isFree ? (
                        <span className="text-green-600 font-semibold">
                          Free
                        </span>
                      ) : (
                        <span className="text-indigo-600 font-semibold">
                          Paid (₹{course.price})
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(course._id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(course._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400">
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <div className="p-6 space-y-6">
        {isViewOpen && selectedCourse && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[450px] space-y-4">
              <h2 className="text-xl font-bold">Course Details</h2>

              <p>
                <b>Title:</b> {selectedCourse.title}
              </p>
              <p>
                <b>Instructor:</b> {selectedCourse.instructor?.name}
              </p>
              <p>
                <b>Email:</b> {selectedCourse.instructor?.email}
              </p>
              <p>
                <b>Price:</b> ₹{selectedCourse.price}
              </p>
              <p>
                <b>Students:</b> {selectedCourse.enrolledStudents?.length}
              </p>

              <div>
                <b>Description:</b>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsViewOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
