import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/auth/mongodb";
import Course from "@/models/Course";
import { verifyToken } from "@/app/lib/auth";

/* ================= GET / PUT / DELETE COURSE ================= */

interface Params {
  id: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    let course;
    if (user.role === "admin") {
      course = await Course.findById(id);
    } else if (user.role === "teacher") {
      course = await Course.findOne({ _id: id, instructor: user.id });
    } else {
      return NextResponse.json(
        { error: "Students cannot access this route" },
        { status: 403 }
      );
    }

    if (!course)
      return NextResponse.json(
        { error: "Course not found or unauthorized" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error("GET COURSE ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();

    let course;
    if (user.role === "admin") {
      course = await Course.findByIdAndUpdate(id, body, { new: true });
    } else if (user.role === "teacher") {
      course = await Course.findOneAndUpdate(
        { _id: id, instructor: user.id },
        body,
        { new: true }
      );
    } else {
      return NextResponse.json(
        { error: "Students cannot update courses" },
        { status: 403 }
      );
    }

    if (!course)
      return NextResponse.json(
        { error: "Not authorized or course not found" },
        { status: 403 }
      );

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    let course;
    if (user.role === "admin") {
      course = await Course.findByIdAndDelete(id);
    } else if (user.role === "teacher") {
      course = await Course.findOneAndDelete({ _id: id, instructor: user.id });
    } else {
      return NextResponse.json(
        { error: "Students cannot delete courses" },
        { status: 403 }
      );
    }

    if (!course)
      return NextResponse.json(
        { error: "Not authorized or course not found" },
        { status: 403 }
      );

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}