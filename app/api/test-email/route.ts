import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"LMS Test" <test@lms.com>',
      to: "student@test.com",
      subject: "Mailtrap Testing",
      html: "<h1>Email is working 🎉</h1>",
    });

    return NextResponse.json({ message: "Email Sent Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Email Failed" });
  }
}