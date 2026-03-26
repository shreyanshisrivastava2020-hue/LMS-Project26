import mongoose, { Schema, model, models } from "mongoose";

const QuizSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    title: { type: String, required: true },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    order: { type: Number, required: true },

    videos: {
      type: [String],
      default: [],
    },

    pdfs: {
      type: [String],
      default: [],
    },

    quiz: {
      type: [QuizSchema],
      default: [],
    },

    checkpointRequired: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Section = models.Section || model("Section", SectionSchema);

export default Section;