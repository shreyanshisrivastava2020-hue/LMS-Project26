import connectDB from "@/app/lib/mongodb";
import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const certificates = await Certificate.find().sort({ createdAt: -1 });

    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}