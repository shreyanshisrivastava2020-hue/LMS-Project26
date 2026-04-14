"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  Wallet,
  BarChart3,
  User,
  Settings,
  ChevronRight,
  ChevronLeft,
  Bell,
} from "lucide-react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashteach", icon: LayoutDashboard },
    {
      name: "Create Course",
      href: "/createcourse",
      icon: PlusCircle,
    },
    { name: "My Courses", href: "/my-courses", icon: BookOpen },
    { name: "Students", href: "/student", icon: Users },
    { name: "Earnings", href: "/earnings", icon: Wallet },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Profile", href: "/teacherProfile", icon: User },
    { name: "Settings", href: "/setting", icon: Settings },
    { name: "Notification", href: "/notificat", icon: Bell },
  ];

  return (
    <div className="relative">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-64px)]
        bg-slate-900 text-gray-300 flex flex-col
        transition-all duration-300 z-50
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-white">Instructor</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-slate-800"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-visible">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`relative group flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }
                  ${collapsed ? "justify-center" : "gap-3"}
                  `}
                >
                  {/* Icon */}
                  <Icon size={18} />

                  {/* Label when expanded */}
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}

                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <div
                      className="absolute left-full ml-4
                      px-3 py-1.5 rounded-md
                      bg-slate-800 text-white text-xs font-medium
                      whitespace-nowrap shadow-lg
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200"
                    >
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <motion.main
        animate={{ marginLeft: collapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className=" min-h-screen p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}
