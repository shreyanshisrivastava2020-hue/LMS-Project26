import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/users";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  if (user.role === "instructor") {
    await user.populate(
      "createdCourses",
      "title description price level category rating thumbnail enrolledStudents",
    );
    return NextResponse.json({ message: "Instructor Found", data: user });
  }
  if (user.role === "student") {
    await user.populate("enrolledCourses", "title description price");
    return NextResponse.json({ message: "Student Found", data: user });
  }
  return NextResponse.json({ message: "User Found", data: user });
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const body = await request.json();

    const updateFields: Record<string, any> = {};
    if (body.name !== undefined) updateFields.name = body.name;
    if (body.email !== undefined) updateFields.email = body.email;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, select: "-password" },
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error updating user",
        error: error.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}
