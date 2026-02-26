import { Schema, model, models, Document, Types } from "mongoose";

/* ================= ENUMS ================= */

export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

/* ================= INTERFACE ================= */

export interface ICourse extends Document {
  title: string;
  slug?: string;
  description: string;
  shortDescription?: string;

  instructor?: Types.ObjectId; // ✅ must match API

  category: string;
  tags?: string[];

  level: CourseLevel;
  language: string;

  price: number;
  thumbnail?: string;
  previewVideo?: string;

  modules: Types.ObjectId[];

  totalDuration: number;
  totalLessons: number;

  studentsEnrolled: Types.ObjectId[];

  averageRating: number;
  totalReviews: number;

  status: CourseStatus;
  isPublished: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/* ================= SCHEMA ================= */

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
    },

    // ✅ IMPORTANT: must match API (instructor, not teacher)
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    level: {
      type: String,
      enum: Object.values(CourseLevel),
      default: CourseLevel.BEGINNER,
    },

    language: {
      type: String,
      default: "English",
    },

    price: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String,
    },

    previewVideo: {
      type: String,
    },

    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],

    totalDuration: {
      type: Number,
      default: 0,
    },

    totalLessons: {
      type: Number,
      default: 0,
    },

    studentsEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= INDEXES ================= */

CourseSchema.index({ title: "text", description: "text" });
CourseSchema.index({ slug: 1 });
CourseSchema.index({ instructor: 1 });

/* ================= EXPORT ================= */

export default models.Course ||
  model<ICourse>("Course", CourseSchema);