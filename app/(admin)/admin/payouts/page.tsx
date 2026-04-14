"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, DollarSign, CheckCircle } from "lucide-react";

export default function PayoutsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const payouts = [
    {
      instructor: "John Doe",
      amount: "$1200",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      instructor: "Sarah Smith",
      amount: "$950",
      method: "PayPal",
      status: "Paid",
    },
  ];

  const filters = ["All", "Pending", "Paid"];

  const filtered = payouts.filter((p) => {
    return (
      (filter === "All" || p.status === filter) &&
      p.instructor.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Payouts & Earnings
        </h1>
        <p className="text-gray-500">Manage instructor payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Payouts</p>
            <h2 className="text-2xl font-semibold">$85,400</h2>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl font-semibold">$12,300</h2>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-2xl font-semibold">$73,100</h2>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full lg:w-1/3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-5 space-y-4">
          {filtered.map((p, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">{p.instructor}</p>
                  <p className="text-sm text-gray-400">{p.method}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold">{p.amount}</span>

                <Badge variant={p.status === "Paid" ? "default" : "secondary"}>
                  {p.status}
                </Badge>

                {p.status === "Pending" && (
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="w-4 h-4" /> Mark Paid
                  </Button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No payouts found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
