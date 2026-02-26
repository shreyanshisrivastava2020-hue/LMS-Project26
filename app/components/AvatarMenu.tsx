"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type UserType = {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
};

function AvatarMenu() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={() => setProfileOpen((p) => !p)}>
        <img
          src={user.avatarUrl || "/images/avatar.jpg"}
          className="h-9 w-9 rounded-full border object-cover"
          alt="profile"
        />
      </button>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-xl border p-4 z-50"
          >
            <div className="flex gap-4 items-center">
              <img
                src={user.avatarUrl || "/images/avatar.jpg"}
                className="h-12 w-12 rounded-full object-cover"
                alt="avatar"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className="text-xs text-blue-600">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t pt-3 space-y-2 text-sm">
              <p
                onClick={() => router.push("/profile")}
                className="cursor-pointer hover:text-blue-600"
              >
                View Profile
              </p>
              <p
                onClick={() => router.push("/settings")}
                className="cursor-pointer hover:text-blue-600"
              >
                Settings
              </p>
              <p
                onClick={() => {
                  document.cookie = "token=; Max-Age=0; path=/";
                  router.push("/");
                }}
                className="cursor-pointer text-red-500"
              >
                Logout
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AvatarMenu;