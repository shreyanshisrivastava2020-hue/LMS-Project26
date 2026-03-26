import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
connect();

export async function GET() {
  try {
    const users = await User.find();
    if (users) {
      return NextResponse.json({
        message: "Got all Users",
        users,
        status: 200,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
