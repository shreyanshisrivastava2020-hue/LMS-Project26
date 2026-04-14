import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  title: String;
  description: String;
  thumbnail: {
    url: String;
    public_id: String;
  };
  price: number;
  category: String;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: String;
  instructor: mongoose.Schema.Types.ObjectId;
  modules: {
    title: String;
    description: String;
    lesson: {
      title: String;
      description: String;
      url: String;
      completed: boolean;
      type: String;
      duration: number;
      isPreview: boolean;
    }[];
  }[];
  enrolledStudents: mongoose.Schema.Types.ObjectId[];
  rating: number;
  totalReviews: number;
  isPublished: boolean;
}

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  completed: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["video", "quiz", "assignment"],
    default: "video",
  },
  duration: Number,
  isPreview: {
    type: Boolean,
    default: false,
  },
});

const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    thumbnail: {
      url: String,
      public_id: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    duration: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modules: [moduleSchema],
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Course ||
  mongoose.model<ICourse>("Course", courseSchema);
