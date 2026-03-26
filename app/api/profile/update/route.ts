import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

connect();

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );

    const body = await request.json();
    const { username, contact, bio } = body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { username, contact, bio },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}