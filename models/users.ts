import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";

  // Instructor Fields
  bio?: string;
  expertise?: string[];
  experience?: number;
  profileImage?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  totalEarnings?: number;
  createdCourses?: mongoose.Types.ObjectId[];
  isVerified?: boolean;
  forgotPasswordToken: String;
  forgotPasswordTokenExpiry: Date;
  verifyToken: String;
  verifyTokenExpiry: Date;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    bio: String,

    expertise: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number,
    },

    profileImage: String,

    socialLinks: {
      linkedin: String,
      github: String,
      website: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    createdCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
