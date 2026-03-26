'use client';

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Dummy user (replace with API later)
    const user = {
      name: "Shreya Srivastava",
      email: "shreya@example.com",
      notifications: true,
    };

    setName(user.name);
    setEmail(user.email);
    setNotifications(user.notifications);
  }, []);

  const handleProfileSave = () => {
    // Replace with API call
    console.log({ name, email, notifications });
    alert("Profile updated successfully");
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill all password fields");
      return;
    }

    // Replace with API
    console.log({ currentPassword, newPassword });
    alert("Password updated successfully");

    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-medium text-gray-800">
            Profile Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 text-gray-500"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Email Notifications
              </p>
              <p className="text-xs text-gray-500">
                Receive course updates and announcements
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  notifications ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="pt-3">
            <button
              onClick={handleProfileSave}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white border rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-medium text-gray-800">
            Change Password
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handlePasswordChange}
              className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-black"
            >
              Update Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}