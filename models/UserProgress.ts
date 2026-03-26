import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completedLessons: [Number],
  lastLesson: Number
});

export default mongoose.models.UserProgress ||
mongoose.model("UserProgress", UserProgressSchema);