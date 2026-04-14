import { connect } from "@/dbConfig/dbConfig";
import bufferToStream from "@/helpers/bufferToStream";
import cloudinary from "@/lib/cloudinary";
import Course from "@/models/courseModel";
import User from "@/models/users";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

connect();
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const userId = request.headers.get("x-user-id");
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }
    if (user.role !== "instructor") {
      return NextResponse.json(
        { message: "Only instructors are allowed" },
        { status: 401 },
      );
    }
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const level = formData.get("level") as string;
    const category = formData.get("category") as string;
    const thumbnail = formData.get("thumbnail") as File | null;

    const duplicate = await Course.findOne({
      title,
      description,
      instructor: userId,
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Course already exists" },
        { status: 400 },
      );
    }

    const arrayBuffer = await thumbnail?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer!);

    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_IMAGE_FOLDER,
        },
        async (error, result) => {
          if (error || !result) {
            resolve(NextResponse.json({ error }, { status: 500 }));
            return;
          }

          const newCourse = new Course({
            title,
            description,
            category,
            level,
            instructor: userId,
            duration,
            thumbnail: {
              url: result.secure_url,
              public_id: result.public_id,
            },
          });

          const savedCourse = await newCourse.save();
          await User.findByIdAndUpdate(userId, {
            $push: {
              createdCourses: savedCourse._id,
            },
          });

          resolve(
            NextResponse.json({
              message: "New Course created successfully",
              success: true,
              status: 201,
              savedCourse,
            }),
          );
        },
      );
      bufferToStream(buffer).pipe(uploadStream);
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
