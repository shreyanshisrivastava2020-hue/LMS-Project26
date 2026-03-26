"use client";
import { useState } from "react";

export default function QuizComponent() {
  const [selected, setSelected] = useState<number | null>(null);

  const submitQuiz = async () => {
    const res = await fetch("/api/student/submit-quiz", {
      method: "POST",
      body: JSON.stringify({
        userId: "USER_ID",
        courseId: "COURSE_ID",
        sectionId: "SECTION_ID",
        answers: [selected],
      }),
    });

    const data = await res.json();
    alert(`Score: ${data.percentage}%`);
  };

  return (
    <div className="mt-6">
      <h3>What is HTTP?</h3>

      <div onClick={() => setSelected(0)}>Protocol</div>
      <div onClick={() => setSelected(1)}>Database</div>

      <button onClick={submitQuiz} className="bg-blue-500 text-white px-3 py-2 mt-4">
        Submit Quiz
      </button>
    </div>
  );
}