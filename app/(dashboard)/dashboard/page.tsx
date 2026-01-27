import { getUserCourses, getUserStreak } from '@/app/actions/course';
import { syncUserToDatabase } from '@/app/actions/user';
import Link from 'next/link';

// Helper: format duration
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export default async function StudentDashboardPage() {
  // Mock user (replace with Clerk auth later)
  const user = {
    id: 'mock-user-id',
    firstName: 'Student',
    lastName: 'Example',
    email: 'student@example.com',
  };

  // 🔹 Sync user to DB
  await syncUserToDatabase( {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  // 🔹 Fetch user's courses
  const coursesResult = await getUserCourses(user.id);
  const courses = (coursesResult.success && Array.isArray(coursesResult.courses))
    ? coursesResult.courses
    : [];

  // 🔹 Calculate course stats
  const enrichedCourses = courses.map((course: any) => {
    let totalMinutes = course.totalDuration || 0;

    // If no totalDuration, calculate from lessons
    if (!totalMinutes && course.modules) {
      let totalSeconds = 0;
      course.modules.forEach((mod: any) => {
        mod.lessons?.forEach((lesson: any) => {
          totalSeconds += lesson.videoDuration || 0;
        });
      });
      totalMinutes = Math.ceil(totalSeconds / 60);
    }

    return {
      id: course._id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      category: course.category,
      thumbnail: course.thumbnail || '/images/default-course.jpg',
      progress: course.progress || 0,
      totalLessons: course.totalLessons || 0,
      completedLessonsCount: course.completedLessonsCount || 0,
      durationMinutes: totalMinutes,
      durationFormatted: totalMinutes > 0 ? formatDuration(totalMinutes) : '0m',
    };
  });

  // 🔹 Calculate dashboard stats
  const activeCourses = enrichedCourses.length;
  const completedLessons = enrichedCourses.reduce((sum, c) => sum + c.completedLessonsCount, 0);
  const totalLearningTimeMinutes = enrichedCourses.reduce((sum, c) => sum + c.durationMinutes, 0);
  const learningTimeFormatted = totalLearningTimeMinutes > 0 ? formatDuration(totalLearningTimeMinutes) : '0h';

  // 🔹 Fetch user streak
  const streakResult = await getUserStreak(user.id);
  const dayStreak = streakResult.success ? streakResult.streak : 0;

  // 🔹 Recent activity
  const recentActivity = enrichedCourses
    .filter(c => c.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4)
    .map(c => {
      if (c.progress === 100) return { type: 'completed', title: `Completed "${c.title}"` };
      if (c.progress > 50) return { type: 'milestone', title: `${c.progress}% complete in "${c.title}"` };
      if (c.progress > 0) return { type: 'started', title: `Started "${c.title}"` };
      return { type: 'started', title: `Enrolled in "${c.title}"` };
    });

  // 🔹 Render UI
  return (
    <div className="min-h-full gradient-bg-page">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-base text-gray-600">
              Continue your learning journey and achieve your goals
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Courses */}
          <div className="relative overflow-hidden gradient-stat-blue rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">📚</div>
                <span className="text-2xl font-bold">{activeCourses}</span>
              </div>
              <p className="text-sm font-medium text-blue-100">Active Courses</p>
            </div>
          </div>

          {/* Lessons Complete */}
          <div className="relative overflow-hidden gradient-stat-purple rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">✓</div>
                <span className="text-2xl font-bold">{completedLessons}</span>
              </div>
              <p className="text-sm font-medium text-purple-100">Lessons Complete</p>
            </div>
          </div>

          {/* Total Learning Time */}
          <div className="relative overflow-hidden gradient-stat-amber rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">⏱️</div>
                <span className="text-2xl font-bold">{learningTimeFormatted}</span>
              </div>
              <p className="text-sm font-medium text-amber-100">Total Content</p>
            </div>
          </div>

          {/* Day Streak */}
          <div className="relative overflow-hidden gradient-stat-emerald rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">🔥</div>
                <span className="text-2xl font-bold">{dayStreak}</span>
              </div>
              <p className="text-sm font-medium text-emerald-100">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Continue Learning / Recent Activity */}
        {/* You can map enrichedCourses or recentActivity here */}
      </div>
    </div>
  );
}
