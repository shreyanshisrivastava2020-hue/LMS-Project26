"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Send,
  Users,
  User,
  GraduationCap,
  Mail,
  Smartphone,
  AlertCircle,
  Trash2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function NotificationsPage() {
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Users");
  const [type, setType] = useState("in-app");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ FETCH NOTIFICATIONS
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/admin/notification");
        const data = await res.json();

        if (data.success) {
          setNotifications(data.data);
        }
      } catch {
        toast.error("Failed to load notifications");
      }
    };

    fetchNotifications();
  }, []);

  // ✅ SEND NOTIFICATION
  const handleSend = async () => {
    if (!message) return toast.error("Message required");

    try {
      setLoading(true);

      const res = await fetch("/api/admin/notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          audience,
          type,
          priority,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("Notification sent");

      setMessage("");
      setNotifications((prev) => [data.data, ...prev]);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE NOTIFICATION
  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      const res = await fetch(`/api/admin/notification?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("Notification deleted");

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ICON HELPER
  const getAudienceIcon = (aud: string) => {
    if (aud === "All Users") return <Users className="w-4 h-4" />;
    if (aud === "Students") return <GraduationCap className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <p className="text-gray-500">
          Send announcements and manage LMS communication
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Sent</p>
            <h2 className="text-2xl font-bold">{notifications.length}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">High Priority</p>
            <h2 className="text-2xl font-bold">
              {notifications.filter((n) => n.priority === "high").length}
            </h2>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* CREATE */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              Create Notification
            </h2>

            <textarea
              placeholder="Write announcement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-28 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* AUDIENCE */}
            <div className="flex gap-2 flex-wrap">
              {["All Users", "Students", "Instructors"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    audience === a ? "bg-indigo-600 text-white" : "bg-white"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            {/* TYPE */}
            <div className="flex gap-2">
              <Button
                variant={type === "in-app" ? "default" : "outline"}
                onClick={() => setType("in-app")}
              >
                <Smartphone className="w-4 h-4 mr-1" />
                In-App
              </Button>

              <Button
                variant={type === "email" ? "default" : "outline"}
                onClick={() => setType("email")}
              >
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
            </div>

            {/* PRIORITY */}
            <div className="flex gap-2">
              {["normal", "high"].map((p) => (
                <Button
                  key={p}
                  variant={priority === p ? "default" : "outline"}
                  onClick={() => setPriority(p)}
                >
                  {p === "high" && <AlertCircle className="w-4 h-4 mr-1" />}
                  {p}
                </Button>
              ))}
            </div>

            {/* SEND */}
            <Button
              onClick={handleSend}
              disabled={loading}
              className="w-full gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? "Sending..." : "Send Notification"}
            </Button>
          </CardContent>
        </Card>

        {/* HISTORY */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notification History</h2>

            {notifications.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No notifications yet
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    className="flex justify-between items-center border rounded-xl p-4 hover:shadow-sm transition"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getAudienceIcon(n.audience)}
                      </div>

                      <div>
                        <p className="font-medium">{n.message}</p>

                        <div className="flex gap-2 mt-1 flex-wrap">
                          <Badge>{n.audience}</Badge>
                          <Badge variant="secondary">{n.type}</Badge>
                          <Badge
                            className={
                              n.priority === "high"
                                ? "bg-red-100 text-red-600"
                                : ""
                            }
                          >
                            {n.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>

                      <button
                        onClick={() => handleDelete(n._id)}
                        disabled={deletingId === n._id}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deletingId === n._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
