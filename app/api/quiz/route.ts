// app/api/quiz/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { answers, correctAnswers } = await req.json();

  let score = 0;

  answers.forEach((ans: number, i: number) => {
    if (ans === correctAnswers[i]) score++;
  });

  return NextResponse.json({
    score,
    total: correctAnswers.length,
  });
}