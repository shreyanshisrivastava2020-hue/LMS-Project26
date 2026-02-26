"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, BookOpen, Users, Wallet, BarChart3, User, Settings, LogOut } from "lucide-react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/teacher-temp", icon: LayoutDashboard },
    { name: "Create Course", href: "/teacher-temp/create-course", icon: PlusCircle },
    { name: "My Courses", href: "/teacher-temp/courses", icon: BookOpen },
    
    { name: "Students", href: "/teacher-temp/students", icon: Users },
    { name: "Earnings", href: "/teacher-temp/earnings", icon: Wallet },
    { name: "Analytics", href: "/teacher-temp/analytics", icon: BarChart3 },
    { name: "Profile", href: "/teacher-temp/profile", icon: User },
    { name: "Settings", href: "/teacher-temp/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] text-gray-300 hidden md:flex flex-col">

        {/* Logo / Title */}
        <div className="px-8 py-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Instructor Panel
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your courses
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-indigo-500"
                    : "hover:bg-slate-800/70 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-6 py-6 border-t border-slate-800">
          <button className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg transition">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        {children}
      </main>
    </div>
  );
}