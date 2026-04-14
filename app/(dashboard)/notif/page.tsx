"use client";

import { useEffect, useState } from "react";
import { Bell, AlertCircle, Mail, Smartphone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH NOTIFICATIONS
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification");

        const data = await res.json();

        if (data.success) {
          setNotifications(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-600" />
          Notifications
        </h1>
        <p className="text-gray-500">
          Stay updated with platform announcements and alerts
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No notifications available
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n, i) => (
            <Card
              key={i}
              className="rounded-xl border hover:shadow-md transition"
            >
              <CardContent className="p-5 space-y-3">
                {/* MESSAGE */}
                <p className="font-medium text-lg">{n.message}</p>

                {/* META */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex gap-2 flex-wrap">
                    {/* Audience */}
                    <Badge>{n.audience}</Badge>

                    {/* Type */}
                    <Badge variant="secondary" className="gap-1">
                      {n.type === "email" ? (
                        <Mail className="w-3 h-3" />
                      ) : (
                        <Smartphone className="w-3 h-3" />
                      )}
                      {n.type}
                    </Badge>

                    {/* Priority */}
                    {n.priority === "high" && (
                      <Badge className="bg-red-100 text-red-600 gap-1">
                        <AlertCircle className="w-3 h-3" />
                        High Priority
                      </Badge>
                    )}
                  </div>

                  {/* Date */}
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
