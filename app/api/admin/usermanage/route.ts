import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";

connect();

//todo:edit and view functionality for users
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const admin = await User.findById(userId);

    if (!admin || admin.role !== "admin") {
      return NextResponse.json(
        { message: "Only admins allowed" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const role = searchParams.get("role"); // ✅ new
    const uid = searchParams.get("uid"); // ✅ for view single user

    // ✅ 1. VIEW SINGLE USER
    if (uid) {
      const user = await User.findById(uid).select("-password");

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        data: user,
      });
    }

    // ✅ 2. FILTER USERS
    const query: any = {
      role: { $ne: "admin" },
      name: { $regex: search, $options: "i" },
    };

    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch users",
    });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Only admins are allowed" },
        { status: 401 },
      );
    }

    const deletedUserId = request.nextUrl.searchParams.get("uid");

    if (!deletedUserId) {
      return NextResponse.json(
        { message: "No user id given" },
        { status: 400 },
      );
    }

    const deletedUser = await User.findById(deletedUserId);
    if (!deletedUser) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    await User.findByIdAndDelete(deletedUserId);
    return NextResponse.json({
      success: true,
      data: {
        name: deletedUser.name,
        email: deletedUser.email,
        role: deletedUser.role,
      },
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch users",
    });
  }
}
//EDIT USER
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 },
      );
    }

    const admin = await User.findById(userId);

    if (!admin || admin.role !== "admin") {
      return NextResponse.json(
        { message: "Only admins allowed" },
        { status: 401 },
      );
    }

    const { uid, name, email, role } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      uid,
      {
        name,
        email,
        role,
      },
      { new: true }, // ✅ return updated user
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to update user",
    });
  }
}
