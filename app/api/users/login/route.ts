export const dynamic = "force-dynamic";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // ✅ Connect DB safely
    await connect();

    const body = await request.json();
    const { email, password, role } = body;

    // ✅ Validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // ✅ Role check
    if (user.role !== role) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }

    // ✅ Password check
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // ✅ Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    // ✅ Create token
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
      },
      { status: 200 }
    );

    // ✅ Set cookie (IMPORTANT)
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // auto switch
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}