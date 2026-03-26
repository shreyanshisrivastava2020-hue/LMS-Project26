import connectDB from "@/app/lib/mongodb";
import Course from "@/models/Course";
import Section from "@/models/Section";
import mongoose from "mongoose";

export default async function seedTestCourse(
  teacherId: string
) {
  await connectDB();

  // Create Course
  const course = await Course.create({
    title: "Full Stack Web Development - Test Course",
    description:
      "Complete MERN stack course with checkpoints and certification.",
    instructor: new mongoose.Types.ObjectId(teacherId),
    isPublished: true,
  });

  // Create Section 1
  const section1 = await Section.create({
    title: "Web Fundamentals",
    courseId: course._id,
    order: 1,
    videos: [
      "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    ],
    pdfs: [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
    quiz: [
      {
        question: "What is HTTP?",
        options: [
          "Protocol",
          "Database",
          "Programming Language",
          "Browser",
        ],
        correctAnswer: 0,
      },
    ],
    checkpointRequired: true,
  });

  // Create Section 2
  const section2 = await Section.create({
    title: "JavaScript Basics",
    courseId: course._id,
    order: 2,
    videos: [
      "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    ],
    pdfs: [],
    quiz: [
      {
        question: "Which keyword declares variable?",
        options: ["let", "loop", "int", "def"],
        correctAnswer: 0,
      },
    ],
    checkpointRequired: true,
  });

  // Attach sections to course
  course.sections = [
    section1._id,
    section2._id,
  ];

  await course.save();

  return course;
}