import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Notification from "@/models/notification";

connect();

// ✅ GET ALL NOTIFICATIONS
export async function GET() {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
}

// ✅ CREATE NOTIFICATION
export async function POST(req: NextRequest) {
  try {
    const { message, audience, type, priority } = await req.json();

    if (!message || !audience) {
      return NextResponse.json(
        { success: false, message: "Message & audience required" },
        { status: 400 },
      );
    }

    const notification = await Notification.create({
      message,
      audience,
      type,
      priority,
    });

    return NextResponse.json({
      success: true,
      message: "Notification sent",
      data: notification,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to send notification",
    });
  }
}

// ✅ DELETE NOTIFICATION
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Notification not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification deleted",
      id,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete notification",
    });
  }
}
