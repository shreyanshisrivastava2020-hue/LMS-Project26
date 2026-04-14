"use client";

import { useState } from "react";
import { Lock, Bell, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (currentPassword === newPassword) {
        toast.error("New and Current Password cannot be same.");
        return;
      }
      const res = await fetch("/api/users/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <main className="flex-1 px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Instructor Settings</h1>
          <p className="text-slate-600 mt-1">
            Manage your teaching profile, earnings and preferences
          </p>
        </div>

        <div className="space-y-8 max-w-4xl">
          {/* ACCOUNT SECURITY */}
          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Account Security</h2>
            </div>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="text-sm text-slate-600">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm text-slate-600">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter new password"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>

              {/* Message */}
              {message && (
                <p className="text-sm mt-2 text-slate-700">{message}</p>
              )}
            </div>
          </section>

          {/* NOTIFICATION */}
          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <Toggle label="Student Enrollments" />
              <Toggle label="Course Reviews" />
              <Toggle label="Announcements" />
            </div>
          </section>

          {/* PRIVACY */}
          <section className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-indigo-600" />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>

            <div className="space-y-4">
              <Toggle label="Public Instructor Profile" />
              <Toggle label="Show Earnings" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Toggle Component */
function Toggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <p>{label}</p>
      <input
        type="checkbox"
        className="h-5 w-5 accent-indigo-600 cursor-pointer"
      />
    </div>
  );
}
