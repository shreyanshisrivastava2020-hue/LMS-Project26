import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    studentName: String,
    courseName: String,
    instructor: String,
    date: String,
    userId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);