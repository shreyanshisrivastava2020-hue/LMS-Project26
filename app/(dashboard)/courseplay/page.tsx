"use client";

import { useState } from "react";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CoursePlayer() {
  const [activeLesson, setActiveLesson] = useState(0);

  const lessons = [
    "What is React?",
    "Setting up environment",
    "JSX Basics",
    "First Component",
    "Project Setup",
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Course Content</h2>

        <div className="space-y-2">
          {lessons.map((lesson, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveLesson(i)}
              className={`p-4 rounded-xl cursor-pointer border transition flex justify-between items-center
              ${
                activeLesson === i
                  ? "bg-indigo-50 border-indigo-500 shadow-sm"
                  : "hover:bg-slate-50"
              }`}
            >
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  <PlayCircle size={16} /> {i + 1}. {lesson}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Clock size={12} /> 10 min
                </p>
              </div>

              {activeLesson > i && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 space-y-6">
        {/* VIDEO PLAYER */}
        <div className="w-full h-105 bg-black rounded-2xl flex items-center justify-center text-white text-lg shadow-lg">
          ▶ Video Player
        </div>

        {/* LESSON CARD */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">
            {lessons[activeLesson]}
          </h2>

          <p className="text-slate-600 mb-6">
            This lesson will teach you the fundamentals and practical concepts
            required to master this topic.
          </p>

          {/* ACTION BAR */}
          <div className="flex justify-between items-center">
            <button
              disabled={activeLesson === 0}
              onClick={() => setActiveLesson((prev) => prev - 1)}
              className="px-5 py-2 border rounded-xl disabled:opacity-50 hover:bg-slate-100 transition"
            >
              Previous
            </button>

            <div className="text-sm text-slate-500">
              {activeLesson + 1} / {lessons.length}
            </div>

            <button
              disabled={activeLesson === lessons.length - 1}
              onClick={() => setActiveLesson((prev) => prev + 1)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl disabled:opacity-50 hover:bg-indigo-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
