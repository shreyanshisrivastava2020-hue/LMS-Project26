// lib/auth/mongodb.ts
import mongoose from "mongoose";
import User from "@/models/User";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

let cached = (global as any).mongoose;

if (!cached) cached = (global as any).mongoose = { conn: null };

export default async function getCurrentUser() {
  if (!cached.conn) {
    const conn = await mongoose.connect(MONGODB_URI);
    cached.conn = conn;
  }

  // Example: find user by some session/email logic
  const user = await User.findOne(); // Replace with actual logic
  return user; // ✅ Must be a document, not mongoose
}
