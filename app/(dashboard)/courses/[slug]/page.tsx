'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseBySlug } from '@/app/actions/course';

import VideoPlayer from '@/app/components/courses/VideoPlayer';
import LessonActions from '@/app/components/courses/LessonActions';
import ResourcesList from '@/app/components/courses/ResourcesList';
import CourseContentSidebar from '@/app/components/courses/CourseContentSidebar';

/* ===================== TYPES ===================== */

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  videoDuration?: number;
  order: number;
  resources?: {
    title: string;
    url: string;
    type: 'pdf' | 'doc' | 'video' | 'link' | 'other';
  }[];
}

interface Module {
  _id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  modules: Module[];
  instructorName?: string;
  category: string;
  difficulty: string;
  learningOutcomes?: string[];
}

/* ===================== PAGE ===================== */

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  /* ===================== FETCH COURSE ===================== */

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        const result = await getCourseBySlug(slug);

        if (result.success && result.course) {
          const courseData = result.course as Course;
          setCourse(courseData);

          // pick first module that has lessons
          const firstModule = courseData.modules.find(mod => mod.lessons.length > 0);
          const firstLesson = firstModule?.lessons[0];

          if (firstModule && firstLesson) {
            setCurrentModule(firstModule);
            setCurrentLesson(firstLesson);
            setExpandedModules(new Set([firstModule._id]));
          }
        }
      } catch (err) {
        console.error('Failed to load course', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  /* ===================== HELPERS ===================== */

  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap(module =>
      module.lessons.map(lesson => ({ module, lesson }))
    );
  }, [course]);

  const getCurrentLessonIndex = () => {
    if (!currentLesson) return -1;
    return allLessons.findIndex(item => item.lesson._id === currentLesson._id);
  };

  const selectLesson = (module: Module, lesson: Lesson) => {
    setCurrentModule(module);
    setCurrentLesson(lesson);
    setExpandedModules(prev => new Set([...prev, module._id]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextLesson = () => {
    const index = getCurrentLessonIndex();
    if (index < allLessons.length - 1) {
      const next = allLessons[index + 1];
      selectLesson(next.module, next.lesson);
    }
  };

  const goToPreviousLesson = () => {
    const index = getCurrentLessonIndex();
    if (index > 0) {
      const prevItem = allLessons[index - 1];
      selectLesson(prevItem.module, prevItem.lesson);
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  };

  /* ===================== STATES ===================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading course…
      </div>
    );
  }

  if (!course || !currentLesson || !currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer videoUrl={currentLesson.videoUrl} />

          <div className="bg-white p-6 rounded-xl border">
            <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
            <p className="text-sm text-gray-600 mt-1">Module: {currentModule.title}</p>

            {currentLesson.description && (
              <p className="mt-4 text-gray-700">{currentLesson.description}</p>
            )}

            <LessonActions
              isCompleted={completedLessons.has(currentLesson._id)}
              onToggleComplete={() => {
                setCompletedLessons(prev => {
                  const next = new Set(prev);
                  next.has(currentLesson._id) ? next.delete(currentLesson._id) : next.add(currentLesson._id);
                  return next;
                });
              }}
              onPrev={goToPreviousLesson}
              onNext={goToNextLesson}
              disablePrev={getCurrentLessonIndex() === 0}
              disableNext={getCurrentLessonIndex() === allLessons.length - 1}
            />

            <ResourcesList resources={currentLesson.resources} />
          </div>
        </div>

        {/* RIGHT */}
        <CourseContentSidebar
          modules={course.modules}
          expandedModules={expandedModules}
          onToggleModule={toggleModule}
          currentLessonId={currentLesson._id}
          completedLessons={completedLessons}
          onSelectLesson={selectLesson}
        />
      </div>
    </div>
  );
}
