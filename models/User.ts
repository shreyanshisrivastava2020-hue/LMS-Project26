import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  
  email: string;
  username?: string;
  firstName?: string;
  contact?: string;
  imageUrl?: string;      // profile image (optional)
  resumePdfUrl?: string;  // PDF file link
  password: string;
  role: "student" |"teacher";
  bio?: string;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: String,

    contact: String,

    imageUrl: String,      // profile image URL

    resumePdfUrl: String,  // store PDF file URL here

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "teacher"],
      
    },
    bio:{
     type:String,
     required:false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// Prevent model overwrite (important for Next.js)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
