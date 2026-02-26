import { Schema, model, models, Document, Types } from "mongoose";

export interface ILesson extends Document {
  title: string;
  module: Types.ObjectId;
  videoUrl?: string;
  pdfUrl?: string;
  content?: string;
  duration?: number;
  order: number;
  isPreview: boolean;
}

const LessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },

    videoUrl: String,
    pdfUrl: String,
    content: String,

    duration: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    isPreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Lesson || model<ILesson>("Lesson", LessonSchema);