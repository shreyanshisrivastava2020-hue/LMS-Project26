"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const LoginTest = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    role?: string;
    apiError?: string;
  }>({});

  // ✅ Email Validation
  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email";
    return "";
  };

  // ✅ Password Validation
  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // ✅ Handle Email Change
  const handleEmailChange = (value: string) => {
    setEmail(value);

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
      apiError: undefined, // remove invalid credential message
    }));
  };

  // ✅ Handle Password Change
  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      apiError: undefined, // remove invalid credential message
    }));
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          apiError: data.message || "Invalid credentials",
        });
        return;
      }
      login();
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "instructor") {
        router.push("/dashteach");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      setErrors({
        apiError: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <span className="bg-linear-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            Login
          </span>
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition ${
                errors.role
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5 relative">
            <label className="block text-sm font-semibold mb-2">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition pr-12 ${
                errors.password
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-300"
              }`}
              placeholder="Enter your password"
            />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* API Error */}
          {errors.apiError && (
            <p className="text-red-600 text-center mb-4">{errors.apiError}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            <span className="flex justify-center items-center gap-2">
              {loading ? "Logging in..." : "Login"}
              <LogIn size={20} />
            </span>
          </button>

          <div className="text-center mt-4">
            <Link href="/" className="text-gray-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginTest;
