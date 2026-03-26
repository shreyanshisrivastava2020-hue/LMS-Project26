"use client";

import { useState } from "react";
import {
  Users,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Dashboard from "../Dashboard"; // your users table component

export default function AdminDashboard() {
  // collapsed = true → sidebar shrinks
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState<
    "overview" | "users" | "settings"
  >("overview");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-gray-200 transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"} flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
          {!collapsed && (
            <span className="text-emerald-400 font-bold text-xl">Admin</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white"
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 flex-1">
          <button
            onClick={() => setSelectedPage("overview")}
            className={`flex items-center px-4 py-2 rounded transition w-full
              ${selectedPage === "overview" ? "bg-gray-800 text-emerald-400" : "hover:bg-gray-800"}`}
          >
            <BarChart3 className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Overview</span>}
          </button>
          <button
            onClick={() => setSelectedPage("users")}
            className={`flex items-center px-4 py-2 rounded transition w-full
              ${selectedPage === "users" ? "bg-gray-800 text-emerald-400" : "hover:bg-gray-800"}`}
          >
            <Users className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Users</span>}
          </button>
          <button
            onClick={() => setSelectedPage("settings")}
            className={`flex items-center px-4 py-2 rounded transition w-full
              ${selectedPage === "settings" ? "bg-gray-800 text-emerald-400" : "hover:bg-gray-800"}`}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow px-6 h-16">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {selectedPage}
          </h1>
          <span className="text-gray-600">Admin User</span>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {selectedPage === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-sm font-medium text-gray-500">
                  Total Users
                </h2>
                <p className="mt-2 text-2xl font-bold text-gray-900">1,245</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-sm font-medium text-gray-500">
                  Active Sessions
                </h2>
                <p className="mt-2 text-2xl font-bold text-gray-900">87</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-sm font-medium text-gray-500">Revenue</h2>
                <p className="mt-2 text-2xl font-bold text-gray-900">$12,340</p>
              </div>
            </div>
          )}

          {selectedPage === "users" && <Dashboard />}
          {selectedPage === "settings" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
              <p className="text-gray-600 mt-2">Admin settings go here...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
