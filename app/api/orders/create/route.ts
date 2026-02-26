import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Order from "@/models/Order";
import Course from "@/models/Course";
import { getUserFromToken } from "@/app/lib/auth";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID required" },
        { status: 400 }
      );
    }

    const course = await Course.findById(
      new mongoose.Types.ObjectId(courseId)
    );

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    if (course.price === 0) {
      return NextResponse.json(
        { error: "Free course does not need order" },
        { status: 400 }
      );
    }

    // Check if already paid
    const existingOrder = await Order.findOne({
      userId: user._id,
      courseId: course._id,
      status: "paid",
    });

    if (existingOrder) {
      return NextResponse.json(
        { error: "Course already purchased" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId: user._id,
      courseId: course._id,
      amount: course.price,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
    });

  } catch (error) {
    console.log("Create Order Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}