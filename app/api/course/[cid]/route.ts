import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Course from "@/models/Course";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cid: string }> }
) {
  try {
    await connectDB();

    const { cid } = await params;

    if (!cid) {
      return NextResponse.json({ error: "CID missing" }, { status: 400 });
    }

    const course = await Course.findById(cid);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}