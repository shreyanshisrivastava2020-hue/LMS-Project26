"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-10 left-0 z-50 h-screen bg-slate-900 text-slate-300
      ${collapsed ? "w-20" : "w-64"}
      hidden md:flex flex-col px-4 py-6`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <span className="text-emerald-300 font-semibold  text-xl">MENU</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-3">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          href="/dashboard"
          active={pathname === "/dashboard"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<BookOpen size={18} />}
          label="Courses"
          href="/courses"
          active={pathname === "/courses"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<User size={18} />}
          label="Profile"
          href="/profile"
          active={pathname === "/profile"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings"
          href="/settings"
          active={pathname === "/settings"}
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active,
  collapsed,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={`group relative flex items-center px-4 py-2 rounded-lg transition
        ${active ? "bg-blue-600 text-white" : "hover:bg-slate-800"}
        ${collapsed ? "justify-center" : "gap-3"}`}
      >
        {/* ICON */}
        {icon}

        {/* LABEL WHEN EXPANDED */}
        {!collapsed && <span className="text-sm font-medium">{label}</span>}

        {/* HOVER LABEL WHEN COLLAPSED */}
        {collapsed && (
          <span
            className="pointer-events-none absolute left-full ml-3
            whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5
            text-xs font-semibold text-white shadow-lg
            opacity-0 group-hover:opacity-100
            -translate-x-1.5 group-hover:translate-x-0
            transition-all duration-200 z-50"
          >
            {label}
          </span>
        )}
      </div>
    </Link>
  );
}
