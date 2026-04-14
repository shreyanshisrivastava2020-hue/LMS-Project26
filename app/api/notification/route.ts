import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Notification from "@/models/notification";
import User from "@/models/users";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID required" },
        { status: 400 },
      );
    }

    // 🔥 Find logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    let query = {};

    // ✅ ROLE-BASED FILTERING
    if (user.role === "student") {
      query = {
        audience: { $in: ["All Users", "Students"] },
      };
    } else if (user.role === "instructor") {
      query = {
        audience: { $in: ["All Users", "Instructors"] },
      };
    } else {
      // fallback (if needed)
      query = {};
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
}
