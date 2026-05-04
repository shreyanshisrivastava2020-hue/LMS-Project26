import mongoose, { Document } from "mongoose";

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  progress: number;
  completedLessons: number[];
  quizScore: number;
  certificateIssued: boolean;
}

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },

  progress: { type: Number, default: 0 },

  // ✅ NEW
  completedLessons: [{ type: Number }],

  // ✅ NEW
  quizScore: { type: Number, default: 0 },

  // ✅ NEW
  certificateIssued: { type: Boolean, default: false },
});

export default mongoose.models.Enrollment ||
  mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);