"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function ConfirmLogoutDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      // 🔴 Call your logout API here
      await fetch("/api/users/logout");

      toast.success("Logged out successfully");

      setOpen(false);
      logout();
      // clear client state if needed
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-2 bg-red-700 text-white px-4 py-2 font-semibold "
        >
          <LogOut size={16} />
          Logout
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Confirm Logout
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You will need to sign in again to
            access your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
