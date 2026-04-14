import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    audience: {
      type: String,
      enum: ["All Users", "Students", "Instructors"],
      required: true,
    },
    type: {
      type: String,
      enum: ["in-app", "email"],
      default: "in-app",
    },
    priority: {
      type: String,
      enum: ["normal", "high"],
      default: "normal",
    },
    status: {
      type: String,
      enum: ["sent"],
      default: "sent",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
