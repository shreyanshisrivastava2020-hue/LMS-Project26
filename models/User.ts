import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  // ✅ ADD THIS
  points: {
    type: Number,
    default: 0,
  },

  // ✅ ADD THIS
  badges: {
    type: [String],
    default: [],
  },
});

const User = models.User || mongoose.model("User", userSchema);
export default User;