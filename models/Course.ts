
import mongoose, { Document } from "mongoose";

export interface ILesson {
  title: string;
  description: string;
  url: string;
  type: "video" | "quiz" | "assignment";
  duration: number;
  isPreview: boolean;
}

export interface IModule {
  title: string;
  description: string;
  lessons: ILesson[];
}

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
  };
  price: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  instructor: mongoose.Schema.Types.ObjectId;
  modules: IModule[];
  enrolledStudents: mongoose.Schema.Types.ObjectId[];
  rating: number;
  totalReviews: number;
  isPublished: boolean;
}

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
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
    title: { type: String, required: true },
    description: String,

    thumbnail: {
      url: String,
      public_id: String,
    },

    price: { type: Number, default: 0 },
    category: String,

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

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model<ICourse>("Course", courseSchema);