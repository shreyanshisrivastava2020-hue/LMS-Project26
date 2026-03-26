'use server';

import connectDB from '@/app/lib/auth/mongodb';
import { Course, CourseStatus } from '@/models/Course';
import { Types } from 'mongoose';
import slugify from 'slugify';

/* =====================================================
   CREATE COURSE
===================================================== */
export async function createCourseAction({
  title,
  description,
  category,
  price,
  level,
  userId,
}: {
  title: string;
  description: string;
  category: string;
  price?: number;
  level?: string;
  userId: string;
}) {
  try {
    await connectDB();

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Course.findOne({ slug });
    if (existing) {
      return { success: false, error: 'Course already exists' };
    }

    const course = await Course.create({
      title,
      slug,
      description,
      category,
      price: price ?? 0,
      level,
      instructor: new Types.ObjectId(userId), // ✅ FIXED
      status: CourseStatus.DRAFT,
      isPublished: false,
    });

    return {
      success: true,
      courseId: course._id.toString(),
    };
  } catch (error) {
    console.error('Create error:', error);
    return { success: false };
  }
}

/* =====================================================
   UPDATE COURSE
===================================================== */
export async function updateCourseAction(
  courseId: string,
  userId: string,
  updates: any
) {
  try {
    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return { success: false };

    // ✅ check instructor instead of createdBy
    if (course.instructor.toString() !== userId) {
      return { success: false, error: 'Not authorized' };
    }

    if (updates.title) {
      course.title = updates.title;
      course.slug = slugify(updates.title, { lower: true, strict: true });
    }

    if (updates.description !== undefined)
      course.description = updates.description;

    if (updates.category !== undefined)
      course.category = updates.category;

    if (updates.price !== undefined)
      course.price = updates.price;

    if (updates.level !== undefined)
      course.level = updates.level;

    await course.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

/* =====================================================
   PUBLISH COURSE
===================================================== */
export async function publishCourseAction(
  courseId: string,
  userId: string
) {
  try {
    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return { success: false };

    if (course.instructor.toString() !== userId) {
      return { success: false, error: 'Not authorized' };
    }

    if (!course.modules || course.modules.length === 0) {
      return { success: false, error: 'Add module before publishing' };
    }

    course.status = CourseStatus.PUBLISHED;
    course.isPublished = true;

    await course.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

/* =====================================================
   DELETE COURSE
===================================================== */
export async function deleteCourseAction(
  courseId: string,
  userId: string
) {
  try {
    await connectDB();

    const course = await Course.findById(courseId);
    if (!course) return { success: false };

    if (course.instructor.toString() !== userId) {
      return { success: false, error: 'Not authorized' };
    }

    await course.deleteOne();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
