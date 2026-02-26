import { Schema, model, models, Document, Types } from "mongoose";

export interface IUserProgress extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  progressPercentage: number;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: [
      { type: Schema.Types.ObjectId, ref: "Lesson" }
    ],
    progressPercentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.UserProgress ||
  model<IUserProgress>("UserProgress", UserProgressSchema);