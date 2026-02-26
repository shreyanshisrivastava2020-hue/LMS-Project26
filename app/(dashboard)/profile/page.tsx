"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Pencil, Save } from "lucide-react";
import { useRouter } from "next/navigation";

type UserType = {
  name: string;
  email: string;
  role: string;
  contact: string;
  avatarUrl: string;
  bio: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Initialize with empty values (IMPORTANT FIX)
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    role: "",
    contact: "",
    avatarUrl: "",
    bio: "",
  });


  // Fetch Logged In User

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        setUser({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          contact: data.contact || "",
          avatarUrl: data.avatarUrl || "",
          bio: data.bio || "",
        });
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);


  // Save Updated Profile

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: user.name,
          contact: user.contact,
          bio: user.bio,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setEditMode(false);
      }
    } catch (error) {
      console.log("Update failed");
    }
  };

 
  const handleAvatarUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    setUser((prev) => ({
      ...prev,
      avatarUrl: preview,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>

          {editMode ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Save size={16} /> Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Pencil size={16} /> Edit
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Avatar Section */}
          <div className="relative group">
            <div className="h-32 w-32 rounded-full overflow-hidden border">
              <Image
                src={user.avatarUrl || "/images/avatar.jpg"}
                alt="avatar"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>

            {editMode && (
              <>
                <button
                  onClick={() => avatarRef.current?.click()}
                  className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition"
                >
                  <Upload size={20} />
                </button>

                <input
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files &&
                    handleAvatarUpload(e.target.files[0])
                  }
                />
              </>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              {editMode ? (
                <input
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p className="font-semibold text-lg">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{user.email}</p>
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm text-gray-500">Contact</label>
              {editMode ? (
                <input
                  value={user.contact}
                  onChange={(e) =>
                    setUser({ ...user, contact: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p>{user.contact || "Not added"}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                {user.role}
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm text-gray-500">Bio</label>
              {editMode ? (
                <textarea
                  value={user.bio}
                  onChange={(e) =>
                    setUser({ ...user, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p className="text-gray-600">
                  {user.bio || "No bio added yet."}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}