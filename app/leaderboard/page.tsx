"use client";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Leaderboard</h1>

      {users.map((user: any, index) => (
        <div key={user._id}>
          #{index + 1} {user.name} - {user.points} pts
        </div>
      ))}
    </div>
  );
}