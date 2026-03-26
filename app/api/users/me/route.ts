import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/auth";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Me Route Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}