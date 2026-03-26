import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  pdfUrl: String,
  resources: [String],
  quiz: [
    {
      question: String,
      options: [String],
      answer: Number
    }
  ]
});

const CourseSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  category: String,
  price: Number,
  image: String,
  lessons: [LessonSchema]
});

export default mongoose.models.Course ||
mongoose.model("Course", CourseSchema);