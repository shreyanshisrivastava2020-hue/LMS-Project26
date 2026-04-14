"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/usermanage?search=${search}&role=${role}`,
      );

      const data = await res.json();
      setUsers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, role]);

  // ✅ Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/usermanage?uid=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      setUsers((prev) => prev.filter((u) => u._id !== id));

      toast.success(`${data.data.name} deleted`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ✅ View User
  const handleView = async (id: string) => {
    const res = await fetch(`/api/admin/usermanage?uid=${id}`);

    const data = await res.json();
    setSelectedUser(data.data);
    setIsViewOpen(true);
  };

  // ✅ Edit User
  const handleEdit = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`/api/admin/usermanage`, {
        method: "PUT",
        body: JSON.stringify({
          uid: selectedUser._id,
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
        }),
      });

      const data = await res.json();

      toast.success("User updated");

      const updated = data.data;

      setUsers((prev) =>
        prev.map((u) => (u._id === updated._id ? updated : u)),
      );

      setIsEditOpen(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-500">Manage users & instructors</p>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center gap-2 w-full md:w-1/3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={role === "" ? "default" : "outline"}
              onClick={() => setRole("")}
            >
              All
            </Button>
            <Button
              variant={role === "student" ? "default" : "outline"}
              onClick={() => setRole("student")}
            >
              Students
            </Button>
            <Button
              variant={role === "instructor" ? "default" : "outline"}
              onClick={() => setRole("instructor")}
            >
              Instructors
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-5">
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-center py-10">No users found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{u.name}</td>
                    <td>{u.email}</td>
                    <td className="capitalize">{u.role}</td>

                    <td className="text-right space-x-2">
                      <Button size="sm" onClick={() => handleView(u._id)}>
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(u);
                          setIsEditOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* VIEW MODAL */}
      {isViewOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3">
            <h2 className="text-xl font-bold">User Details</h2>

            <p>
              <b>Name:</b> {selectedUser.name}
            </p>
            <p>
              <b>Email:</b> {selectedUser.email}
            </p>
            <p>
              <b>Role:</b> {selectedUser.role}
            </p>

            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3">
            <h2 className="text-xl font-bold">Edit User</h2>

            <Input
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              placeholder="Name"
            />

            <Input
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              placeholder="Email"
            />

            <select
              className="w-full border p-2 rounded"
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
