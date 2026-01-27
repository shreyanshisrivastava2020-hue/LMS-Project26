'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '@/app/components/dashboard/DashboardNav';

type Role = 'admin' | 'student';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>('student');
  const [userName, setUserName] = useState('User');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔐 Fake auth (localStorage based)
  useEffect(() => {
    const user = localStorage.getItem('user');
/*
    if (!user) {
      router.push('/sign-in'); // or home page
      return;
    }
*/
if (!user) {
  setRole('student');                   //temporary
  setUserName('Guest');
  setLoading(false);
  return;
}

    const parsedUser = JSON.parse(user);
    setRole(parsedUser.role || 'student');
    setUserName(parsedUser.name || 'User');
    setLoading(false);
  }, [router]);

  if (loading) return null; // or loader

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:hidden bg-white border-b h-14 flex items-center px-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ☰
        </button>
        <span className="ml-3 font-semibold">
          {role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
        </span>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64
        transform transition-transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <DashboardNav
          role={role}
          userName={userName}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
