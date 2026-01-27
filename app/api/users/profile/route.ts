import { NextResponse } from "next/server";
import getCurrentUser from '@/app/lib/auth/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  // 1️⃣ Get the current user
  const user = await getCurrentUser();

  if (!user || !user._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2️⃣ Parse the request body
  const body = await req.json();

  // 3️⃣ Update the user by _id
  await User.findByIdAndUpdate(user._id, {
    firstName: body.firstName,
    lastName: body.lastName,
    contactNumber: body.contactNumber,
    email: body.email,
  });

  // 4️⃣ Return success
  return NextResponse.json({ success: true });
}
