import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  progress: {
    type: Number,
    default: 0,
  },
  completedLessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", enrollmentSchema);