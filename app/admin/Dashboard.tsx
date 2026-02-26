"use client";

import { useEffect, useState } from "react";

type User = {
  _id: number;
  username: string;
  email: string;
};

const Dashboard = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/allusers");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setAllUsers(data.users ?? data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full px-6 lg:px-12 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8 text-gray-900 border-b pb-2">
        Users Dashboard
      </h1>

      {loading && (
        <p className="text-gray-600 animate-pulse">Loading users...</p>
      )}

      {error && <p className="text-red-600 font-medium">Error: {error}</p>}

      {!loading && !error && allUsers.length === 0 && (
        <p className="text-gray-500 italic">No users found.</p>
      )}

      {!loading && !error && allUsers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md bg-white shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 border-b">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 border-b">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-800 border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 transition-colors border-b"
                >
                  <td className="px-4 py-3 text-gray-900">{u.username}</td>
                  <td className="px-4 py-3 text-gray-700">{u.email}</td>
                  <td className="px-4 py-3 text-center space-x-3">
                    <button className="px-4 py-1 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 active:bg-gray-200 transition">
                      View
                    </button>
                    <button className="px-4 py-1 border border-red-400 text-red-600 rounded hover:bg-red-50 active:bg-red-100 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
