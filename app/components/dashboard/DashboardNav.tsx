"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Courses", path: "/dashboard/courses", icon: BookOpen },
    { name: "Certificates", path: "/dashboard/certificates", icon: Award },
    { name: "Wishlist", path: "/dashboard/wishlist", icon: Heart },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#0f172a] text-gray-300 flex flex-col">

      {/* Logo */}
      <div className="px-8 py-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          LMS Student
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Learning Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-slate-800 text-white border-l-4 border-indigo-500"
                  : "hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </button>
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
  );
}