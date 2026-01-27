import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/app/lib/auth/mongodb";

/**
 * CREATE USER
 * POST /api/users
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, firstName, lastName,contact, imageUrl,role } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      email:body.email,
      firstName:body.firstName,
      lastName:body.lastName,
      contact:body.contact,
      imageUrl:body.imageUrl,
      role:body.role,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

/**
 * GET ALL USERS
 * GET /api/users
 */
export async function GET() {
  try {
    await connectDB();

    const users = await User.find().sort({ createdAt: -1 });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
