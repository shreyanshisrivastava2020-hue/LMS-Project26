'use server';

import connectDB from '@/app/lib/auth/mongodb';
import Course from '@/models/Course';
import UserProgress from '@/models/UserProgress';

/* ===================== HELPERS ===================== */

function normalizeId(doc: any) {
  if (!doc) return doc;
  return {
    ...doc,
    _id: doc._id.toString(),
  };
}

function normalizeCourse(course: any) {
  return {
    ...course,
    _id: course._id.toString(),
    modules: course.modules?.map((module: any) => ({
      ...module,
      _id: module._id.toString(),
      lessons: module.lessons?.map((lesson: any) => ({
        ...lesson,
        _id: lesson._id.toString(),
      })),
    })) ?? [],
  };
}

/* ===================== CREATE COURSE ===================== */

export async function createCourse(data: {
  title: string;
  description?: string;
  slug: string;
  price?: number;
  thumbnail?: string;
}) {
  try {
    await connectDB();

    const course = await Course.create({
      title: data.title,
      description: data.description,
      slug: data.slug,
      price: data.price ?? 0,
      thumbnail: data.thumbnail ?? null,
    });

    return {
      success: true,
      course: normalizeCourse(course.toObject()),
    };
  } catch (error) {
    console.error('Create course error:', error);
    return { success: false, error: 'Failed to create course' };
  }
}

/* ===================== GET ALL COURSES ===================== */

export async function getAllCourses() {
  try {
    await connectDB();

    const courses = await Course.find({ isPublished: true })
      .select('_id title slug description category difficulty thumbnail')
      .lean();

    return {
      success: true,
      courses,
    };
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return { success: false, courses: [] };
  }
}

/* ===================== GET COURSE BY SLUG ===================== */

export async function getCourseBySlug(slug: string) {
  try {
    await connectDB();

    const course = await Course.findOne({ slug }).lean();
    if (!course) return { success: false, error: 'Course not found' };

    return { success: true, course: normalizeCourse(course) };
  } catch (error) {
    console.error('getCourseBySlug error:', error);
    return { success: false, error: 'Failed to fetch course' };
  }
}

/* ===================== ENROLL IN COURSE ===================== */

export async function enrollInCourse(userId: string, courseId: string) {
  try {
    await connectDB();

    const existing = await UserProgress.findOne({ userId, courseId });
    if (existing) return { success: false, error: 'Already enrolled' };

    const progress = await UserProgress.create({
      userId,
      courseId,
      modules: [],
      overallProgress: 0,
      isCompleted: false,
      totalTimeSpent: 0,
      certificateIssued: false,
      enrolledAt: new Date(),
      lastAccessedAt: new Date(),
    });

    return { success: true, progress: normalizeId(progress.toObject()) };
  } catch (error) {
    console.error('enrollInCourse error:', error);
    return { success: false, error: 'Enrollment failed' };
  }
}

/* ===================== GET USER COURSES WITH PROGRESS ===================== */

export async function getUserCourses(userId: string) {
  try {
    await connectDB();

    const progressList = await UserProgress.find({ userId }).lean();
    const courseIds = progressList.map(p => p.courseId.toString());

    const courses = await Course.find({ _id: { $in: courseIds } }).lean();

    const merged = courses.map(course => {
      const progress = progressList.find(
        p => p.courseId.toString() === course._id.toString()
      );

      const completedLessonsCount =
        progress?.modules?.reduce(
          (acc, m) => acc + (m.lessons?.filter(l => l.completed)?.length ?? 0),
          0
        ) ?? 0;

      const totalLessons =
        progress?.modules?.reduce(
          (acc, m) => acc + (m.lessons?.length ?? 0),
          0
        ) ?? 0;

      return {
        ...normalizeCourse(course),
        progress: progress?.overallProgress ?? 0,
        completedLessonsCount,
        totalLessons,
      };
    });

    return { success: true, courses: merged };
  } catch (error) {
    console.error('getUserCourses error:', error);
    return { success: false, courses: [] };
  }
}

/* ===================== GET USER STREAK ===================== */

export async function getUserStreak(userId: string) {
  try {
    await connectDB();

    const progresses = await UserProgress.find({ userId }).lean();
    const today = new Date();
    let streak = 0;

    progresses.forEach(p => {
      if (p.lastAccessedAt) {
        const diffDays = Math.floor(
          (today.getTime() - new Date(p.lastAccessedAt).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (diffDays === 0) streak += 1;
      }
    });

    return { success: true, streak };
  } catch (error) {
    console.error('getUserStreak error:', error);
    return { success: false, streak: 0 };
  }
}
