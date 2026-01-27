import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  contact:string;
  imageUrl?: string;
  password?:string;
  createdAt: Date;
  updatedAt: Date;
  role:'student'|'admin';
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    contact:{
      type:String,
    },
    imageUrl: {
      type: String,
    },
    password:{
      type:String,
    },
    role: {
  type: String,
  enum: ['student', 'admin'],
  default: 'student',
},
  },
  { timestamps: true }
);

// prevent model overwrite
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
