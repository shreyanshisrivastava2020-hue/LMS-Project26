"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ConfirmLogoutDialog from "./confirmlogout";
import { Button } from "./ui/button";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* BRAND */}
          <div className="text-white font-bold text-2xl">
            <Link href="/">CS MAJOR</Link>
          </div>

          {/* DESKTOP MENU (Guest only) */}
          {!isLoggedIn && (
            <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
              <li>
                <Link href="/" className="hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/About" className="hover:text-emerald-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/Services" className="hover:text-emerald-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="hover:text-emerald-400">
                  Contact
                </Link>
              </li>
            </ul>
          )}

          {/* AUTH ACTIONS */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 rounded-md font-semibold text-md"
                >
                  Login
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => router.push("/signup")}
                  className="px-4 py-2 rounded-md font-semibold text-md"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <ConfirmLogoutDialog />

                <Button
                  variant="outline"
                  onClick={() => router.push("/Editor")}
                  className="px-4 py-2 rounded-md font-semibold"
                >
                  Editor
                </Button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-emerald-400"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/"
                className="block text-gray-300 hover:text-emerald-400"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-emerald-400"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block text-gray-300 hover:text-emerald-400"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-emerald-400"
              >
                Contact
              </Link>

              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <Link
                  href="/login"
                  className="flex-1 text-center px-4 py-2 rounded-md bg-purple-500 text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="flex-1 text-center px-4 py-2 rounded-md bg-purple-500 text-white"
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/Editor")}
                className="w-full px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold"
              >
                Editor
              </button>

              {/* Logout in mobile */}
              <div className="pt-3 border-t border-gray-700"></div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
