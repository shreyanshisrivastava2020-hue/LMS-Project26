'use client';

import { useRouter } from 'next/navigation';

interface DashboardNavProps {
  role: 'admin' | 'student';
  userName: string;
  onCloseMobile: () => void;
  isMobileMenuOpen: boolean;
}

export default function DashboardNav({
  role,
  userName,
}: DashboardNavProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      router.push('/dashboard/profile');   // 🚀 NOT LOGGED IN
    } else {
      router.push('/signup'); // ✅ LOGGED IN
    }
  };

  return (
    <div className="h-full w-64 bg-white border-r p-4">
      
      {/* PROFILE CLICK AREA */}
      <div
        onClick={handleProfileClick}
        className="mb-6 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">{userName}</span>
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-3">
        <button onClick={() => router.push('/dashboard')}>
         📊 My Dashboard
        </button>

        {role === 'student' && (
          <button onClick={() => router.push('/courses')}>
           📚 My Courses
          </button>
        )}

        {role === 'admin' && (
          <button onClick={() => router.push('/admin')}>
            Admin Panel
          </button>
        )}
      </nav>
    </div>
  );
}
