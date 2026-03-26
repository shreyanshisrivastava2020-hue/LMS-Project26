import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET! // ✅ MUST MATCH LOGIN SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}