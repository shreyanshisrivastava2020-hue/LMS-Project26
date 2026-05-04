import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.set("strictQuery", true);

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB ERROR:", error);
    throw error;
  }
};

export default connectDB;