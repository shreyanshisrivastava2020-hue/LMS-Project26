import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // ✅ Validate password
    const validPassword = await bcryptjs.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // ✅ Create JWT (FIXED - username added)
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username, // 🔥 IMPORTANT FIX
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // ✅ Create response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // ✅ Set cookie properly
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error: any) {
    console.error("Login Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}