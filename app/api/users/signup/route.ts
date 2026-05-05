import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password, role } = reqBody;

    // ✅ 1. Required field validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields including role are required" },
        { status: 400 }
      );
    }

    // ✅ 2. Role validation (STRICT)
    const validRoles = ["student", "instructor", "admin"];

    if (!validRoles.includes(role.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid role selected" },
        { status: 400 }
      );
    }

    // ✅ 3. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ 4. Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // ✅ 5. Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    const savedUser = await newUser.save();

    // ✅ 6. Send verification email (safe)
    try {
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });
    } catch (err) {
      console.error("Email error:", err);
    }

    // ✅ 7. Response
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });

  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}