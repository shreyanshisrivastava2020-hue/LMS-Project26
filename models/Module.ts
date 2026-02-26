import { Schema, model, models, Document, Types } from "mongoose";

export interface IModule extends Document {
  title: string;
  course: Types.ObjectId;
  lessons: Types.ObjectId[];
}

const ModuleSchema = new Schema<IModule>(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  },
  { timestamps: true }
);

export default models.Module || model<IModule>("Module", ModuleSchema);