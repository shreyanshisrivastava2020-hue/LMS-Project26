import { NextRequest, NextResponse } from "next/server";
import Section from "@/models/Section";
import Enrollment from "@/models/Enrollement"; //  fixed spelling
import User from "@/models/User";
import connectDB from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, courseId, sectionId, answers } =
      await req.json();

    const section: any = await Section.findById(sectionId);
    if (!section) {
      return NextResponse.json(
        { message: "Section not found" },
        { status: 404 }
      );
    }

    const enrollment: any = await Enrollment.findOne({
      userId,
      courseId,
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "Enrollment not found" },
        { status: 404 }
      );
    }

    const user: any = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    let score = 0;

    section.quiz.forEach((q: any, index: number) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });

    const percentage =
      section.quiz.length > 0
        ? (score / section.quiz.length) * 100
        : 0;

    // 🎯 Give points if passed
    if (percentage >= 60) {
      user.points += 20;
      await user.save();
    }

    enrollment.score += percentage;
    await enrollment.save();

    return NextResponse.json({ percentage });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}