// models/Progress.ts

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  completedLessons: [
    {
      type: String, // lessonId
    },
  ],
  progressPercentage: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Progress ||
  mongoose.model("Progress", progressSchema);