"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert("All fields are required");
      return;
    }

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Redirect based on role
    if (role === "student") {
         router.push("/dashboard");
    } else{
      router.push("/teacher-temp");
    }
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="border rounded w-full py-3 px-4"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="border rounded w-full py-3 px-4"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Role
            </label>
            <select
              className="border rounded w-full py-3 px-4"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded w-full flex justify-center items-center gap-2"
          >
            Login <LogIn size={18} />
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;