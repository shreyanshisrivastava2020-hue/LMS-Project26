"use client";

import { use, useEffect, useState } from "react";
import { Plus, Video, FileText, File, HelpCircle, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { set } from "mongoose";
// Polish UI: add lesson deletion, improve styles

export default function ManageCourse() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [data, setData] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [editingLesson, setEditingLesson] = useState<{
    sectionId: number;
    lessonId: number;
  } | null>(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState("");
  const [editingLessonType, setEditingLessonType] = useState("");
  const [editingLessonVideoUrl, setEditingLessonVideoUrl] = useState("");
  const [editingLessonVideoDesc, setEditingLessonVideoDesc] = useState("");
  const [editingLessonPdfUrl, setEditingLessonPdfUrl] = useState("");
  const [editingLessonPdfDesc, setEditingLessonPdfDesc] = useState("");
  const [editingLessonResourceUrl, setEditingLessonResourceUrl] = useState("");
  const [editingLessonResourceDesc, setEditingLessonResourceDesc] =
    useState("");
  const [viewingVideo, setViewingVideo] = useState<{
    url: string;
    desc: string;
    title: string;
  } | null>(null);
  const [editingQuizDesc, setEditingQuizDesc] = useState("");
  const [editingQuizQuestions, setEditingQuizQuestions] = useState<string[]>(
    [],
  );
  const [viewingQuiz, setViewingQuiz] = useState<{
    title: string;
    desc: string;
    questions: string[];
  } | null>(null);
  const [viewingPdf, setViewingPdf] = useState<{
    url: string;
    desc: string;
    title: string;
  } | null>(null);
  const [viewingResource, setViewingResource] = useState<{
    url: string;
    desc: string;
    title: string;
  } | null>(null);
  const [editingQuizSection, setEditingQuizSection] = useState<number | null>(
    null,
  );
  const [editingQuizTitle, setEditingQuizTitle] =
    useState("Section Quiz (MCQ)");

  const addSection = () => {
    if (!sectionTitle) return;
    const newSection = {
      id: Date.now(),
      title: sectionTitle,
      lessons: [],
      quiz: false,
      quizTitle: "Section Quiz (MCQ)",
      quizDesc: "",
      quizQuestions: [],
    };
    setSections([...sections, newSection]);
    setSectionTitle("");
  };

  const deleteLesson = (sectionId: number, lessonId: number) => {
    const updated = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.filter(
            (lesson: any) => lesson.id !== lessonId,
          ),
        };
      }
      return section;
    });
    setSections(updated);
  };

  const startEditLesson = (sectionId: number, lesson: any) => {
    setEditingLesson({ sectionId, lessonId: lesson.id });
    setEditingLessonTitle(lesson.title);
    setEditingLessonType(lesson.type);
    setEditingLessonVideoUrl(lesson.videoUrl || "");
    setEditingLessonVideoDesc(lesson.videoDesc || "");
    setEditingLessonPdfUrl(lesson.pdfUrl || "");
    setEditingLessonPdfDesc(lesson.pdfDesc || "");
    setEditingLessonResourceUrl(lesson.resourceUrl || "");
    setEditingLessonResourceDesc(lesson.resourceDesc || "");
  };

  const saveEditLesson = () => {
    if (!editingLesson) return;
    const updated = sections.map((section) => {
      if (section.id === editingLesson.sectionId) {
        return {
          ...section,
          lessons: section.lessons.map((lesson: any) =>
            lesson.id === editingLesson.lessonId
              ? {
                  ...lesson,
                  title: editingLessonTitle,
                  type: editingLessonType,
                  videoUrl:
                    editingLessonType === "video"
                      ? editingLessonVideoUrl
                      : undefined,
                  videoDesc:
                    editingLessonType === "video"
                      ? editingLessonVideoDesc
                      : undefined,
                  pdfUrl:
                    editingLessonType === "pdf"
                      ? editingLessonPdfUrl
                      : undefined,
                  pdfDesc:
                    editingLessonType === "pdf"
                      ? editingLessonPdfDesc
                      : undefined,
                  resourceUrl:
                    editingLessonType === "resource"
                      ? editingLessonResourceUrl
                      : undefined,
                  resourceDesc:
                    editingLessonType === "resource"
                      ? editingLessonResourceDesc
                      : undefined,
                }
              : lesson,
          ),
        };
      }
      return section;
    });
    setSections(updated);
    setEditingLesson(null);
    setEditingLessonTitle("");
    setEditingLessonType("");
    setEditingLessonVideoUrl("");
    setEditingLessonVideoDesc("");
    setEditingLessonPdfUrl("");
    setEditingLessonPdfDesc("");
    setEditingLessonResourceUrl("");
    setEditingLessonResourceDesc("");
  };

  const cancelEditLesson = () => {
    setEditingLesson(null);
    setEditingLessonTitle("");
    setEditingLessonType("");
    setEditingLessonVideoUrl("");
    setEditingLessonVideoDesc("");
    setEditingLessonPdfUrl("");
    setEditingLessonPdfDesc("");
    setEditingLessonResourceUrl("");
    setEditingLessonResourceDesc("");
  };

  const startEditQuiz = (sectionId: number, quizTitle: string) => {
    setEditingQuizSection(sectionId);
    setEditingQuizTitle(quizTitle);
    setEditingQuizDesc("");
    setEditingQuizQuestions([]);
  };

  const saveEditQuiz = () => {
    if (editingQuizSection === null) return;
    const updated = sections.map((section) => {
      if (section.id === editingQuizSection) {
        return {
          ...section,
          quizTitle: editingQuizTitle,
          quizDesc: editingQuizDesc,
          quizQuestions: editingQuizQuestions,
        };
      }
      return section;
    });
    setSections(updated);
    setEditingQuizSection(null);
    setEditingQuizTitle("Section Quiz (MCQ)");
    setEditingQuizDesc("");
    setEditingQuizQuestions([]);
  };

  const cancelEditQuiz = () => {
    setEditingQuizSection(null);
    setEditingQuizTitle("Section Quiz (MCQ)");
    setEditingQuizDesc("");
    setEditingQuizQuestions([]);
  };

  const addLesson = (sectionId: number, type: string) => {
    const updated = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [
            ...section.lessons,
            {
              id: Date.now(),

              title: `${type} lesson`,
              type,
              ...(type === "video" ? { videoUrl: "", videoDesc: "" } : {}),
              ...(type === "pdf" ? { pdfUrl: "", pdfDesc: "" } : {}),
              ...(type === "resource"
                ? { resourceUrl: "", resourceDesc: "" }
                : {}),
            },
          ],
        };
      }
      return section;
    });
    setSections(updated);
  };

  const deleteQuiz = (sectionId: number) => {
    const updated = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            quiz: false,
            quizTitle: "Section Quiz (MCQ)",
            quizDesc: "",
            quizQuestions: [],
          }
        : section,
    );
    setSections(updated);
  };

  const addQuiz = (sectionId: number) => {
    const updated = sections.map((section) =>
      section.id === sectionId
        ? { ...section, quiz: true, quizTitle: "Section Quiz (MCQ)" }
        : section,
    );
    setSections(updated);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(
          `/api/mycourses/manage-course?courseId=${courseId}`,
        );
        const { data } = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);
  return (
    <div className="bg-linear-to-br from-blue-50 via-white to-gray-100 min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">
            {data ? `Manage: ${data.title}` : "Manage Your Course"}
          </h1>
          <p className="text-gray-500 text-lg">
            Organize your course sections, lessons and quizzes
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <input
            type="text"
            placeholder="Enter section title..."
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            className="border border-blue-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 transition rounded-lg px-4 py-3 w-72 md:w-96 bg-white shadow-sm text-gray-700"
          />
          <button
            onClick={addSection}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-lg shadow-md font-semibold"
          >
            <Plus size={20} />
            Add Section
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white border border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition group"
          >
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-blue-50">
              <h2 className="font-semibold text-xl text-blue-800 group-hover:text-blue-900 transition">
                {section.title}
              </h2>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => addLesson(section.id, "video")}
                  className="flex items-center gap-2 text-sm bg-blue-100 hover:bg-blue-200 transition px-3 py-2 rounded-lg font-medium text-blue-700"
                >
                  <Video size={16} />
                  Video
                </button>
                <button
                  onClick={() => addLesson(section.id, "pdf")}
                  className="flex items-center gap-2 text-sm bg-green-100 hover:bg-green-200 transition px-3 py-2 rounded-lg font-medium text-green-700"
                >
                  <FileText size={16} />
                  PDF
                </button>
                <button
                  onClick={() => addLesson(section.id, "resource")}
                  className="flex items-center gap-2 text-sm bg-purple-100 hover:bg-purple-200 transition px-3 py-2 rounded-lg font-medium text-purple-700"
                >
                  <File size={16} />
                  Resource
                </button>
                <button
                  onClick={() => addQuiz(section.id)}
                  className="flex items-center gap-2 text-sm bg-yellow-100 hover:bg-yellow-200 transition px-3 py-2 rounded-lg font-medium text-yellow-700"
                >
                  <HelpCircle size={16} />
                  Quiz
                </button>
              </div>
            </div>

            {/* Lessons */}
            <div className="p-6 space-y-3">
              {section.lessons.length === 0 && !section.quiz && (
                <div className="text-gray-400 italic">
                  No lessons or quiz added yet.
                </div>
              )}
              {section.lessons.map((lesson: any) =>
                editingLesson &&
                editingLesson.sectionId === section.id &&
                editingLesson.lessonId === lesson.id ? (
                  <div
                    key={lesson.id}
                    className="flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <select
                        value={editingLessonType}
                        onChange={(e) => setEditingLessonType(e.target.value)}
                        className="border rounded-md px-2 py-3 text-sm mr-2"
                      >
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="resource">Resource</option>
                      </select>
                      <input
                        type="text"
                        value={editingLessonTitle}
                        onChange={(e) => setEditingLessonTitle(e.target.value)}
                        className="border rounded-md px-2 py-3 text-sm"
                        placeholder="Lesson title"
                      />
                      {editingLessonType === "video" && (
                        <>
                          <input
                            type="text"
                            value={editingLessonVideoUrl}
                            onChange={(e) =>
                              setEditingLessonVideoUrl(e.target.value)
                            }
                            className="border rounded-md px-2 py-3 text-sm ml-2"
                            placeholder="Video URL"
                          />
                          <input
                            type="text"
                            value={editingLessonVideoDesc}
                            onChange={(e) =>
                              setEditingLessonVideoDesc(e.target.value)
                            }
                            className="border rounded-md px-2 py-3 text-sm ml-2"
                            placeholder="Video description"
                          />
                        </>
                      )}
                      {editingLessonType === "pdf" && (
                        <>
                          <input
                            type="text"
                            value={editingLessonPdfUrl}
                            onChange={(e) =>
                              setEditingLessonPdfUrl(e.target.value)
                            }
                            className="border rounded-md px-2 py-3 text-sm ml-2"
                            placeholder="PDF URL"
                          />
                          <input
                            type="text"
                            value={editingLessonPdfDesc}
                            onChange={(e) =>
                              setEditingLessonPdfDesc(e.target.value)
                            }
                            className="border rounded-md px-2 py-3 text-sm ml-2"
                            placeholder="PDF description"
                          />
                        </>
                      )}
                      {editingLessonType === "resource" && (
                        <>
                          <input
                            type="text"
                            value={editingLessonResourceUrl}
                            onChange={(e) =>
                              setEditingLessonResourceUrl(e.target.value)
                            }
                            className="border rounded-md px-2 py-3 text-sm ml-2"
                            placeholder="Resource URL"
                          />
                          <input
                            type="text"
                            value={editingLessonResourceDesc}
                            onChange={(e) =>
                              setEditingLessonResourceDesc(e.target.value)
                            }
                            className="border px-3 py-3 rounded-md text-sm ml-2"
                            placeholder="Resource description"
                          />
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveEditLesson}
                        className="bg-blue-600 text-white px-3 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditLesson}
                        className="bg-gray-200 text-gray-700 px-3 py-3 rounded-md text-sm font-medium hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={lesson.id}
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.type === "video" && (
                        <Video size={18} className="text-blue-500" />
                      )}
                      {lesson.type === "pdf" && (
                        <FileText size={18} className="text-green-500" />
                      )}
                      {lesson.type === "resource" && (
                        <File size={18} className="text-purple-500" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {lesson.title}
                      </span>
                      {lesson.type === "video" && lesson.videoUrl && (
                        <button
                          onClick={() =>
                            setViewingVideo({
                              url: lesson.videoUrl,
                              desc: lesson.videoDesc || "",
                              title: lesson.title,
                            })
                          }
                          className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          View
                        </button>
                      )}
                      {lesson.type === "pdf" && lesson.pdfUrl && (
                        <button
                          onClick={() =>
                            setViewingPdf({
                              url: lesson.pdfUrl,
                              desc: lesson.pdfDesc || "",
                              title: lesson.title,
                            })
                          }
                          className="ml-2 bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          View
                        </button>
                      )}
                      {lesson.type === "resource" && lesson.resourceUrl && (
                        <button
                          onClick={() =>
                            setViewingResource({
                              url: lesson.resourceUrl,
                              desc: lesson.resourceDesc || "",
                              title: lesson.title,
                            })
                          }
                          className="ml-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          View
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditLesson(section.id, lesson)}
                        className="hover:bg-blue-100 rounded-full p-1 transition"
                        title="Edit lesson"
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteLesson(section.id, lesson.id)}
                        className="hover:bg-red-100 rounded-full p-1 transition"
                        title="Delete lesson"
                      >
                        <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                ),
              )}
              {/* Video View Modal */}
              {viewingVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setViewingVideo(null)}
                      title="Close"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-bold mb-4">
                      {viewingVideo.title}
                    </h3>
                    {viewingVideo.url ? (
                      <div className="mb-4">
                        <video
                          src={viewingVideo.url}
                          controls
                          className="w-full rounded"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 text-gray-400">
                        No video URL provided.
                      </div>
                    )}
                    {viewingVideo.desc && (
                      <div className="text-gray-700">{viewingVideo.desc}</div>
                    )}
                  </div>
                </div>
              )}
              {/* PDF View Modal */}
              {viewingPdf && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setViewingPdf(null)}
                      title="Close"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-bold mb-4">
                      {viewingPdf.title}
                    </h3>
                    {viewingPdf.url ? (
                      <div className="mb-4">
                        <iframe
                          src={viewingPdf.url}
                          className="w-full h-64 rounded border"
                          title="PDF Preview"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 text-gray-400">
                        No PDF URL provided.
                      </div>
                    )}
                    {viewingPdf.desc && (
                      <div className="text-gray-700">{viewingPdf.desc}</div>
                    )}
                  </div>
                </div>
              )}
              {/* Resource View Modal */}
              {viewingResource && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setViewingResource(null)}
                      title="Close"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-bold mb-4">
                      {viewingResource.title}
                    </h3>
                    {viewingResource.url ? (
                      <div className="mb-4">
                        <a
                          href={viewingResource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 underline"
                        >
                          Open Resource
                        </a>
                      </div>
                    ) : (
                      <div className="mb-4 text-gray-400">
                        No resource URL provided.
                      </div>
                    )}
                    {viewingResource.desc && (
                      <div className="text-gray-700">
                        {viewingResource.desc}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {section.quiz &&
                (editingQuizSection === section.id ? (
                  <div className="flex flex-col md:flex-row items-center gap-3 border border-yellow-200 rounded-lg p-3 bg-yellow-50 shadow-sm">
                    <HelpCircle size={18} className="text-yellow-600" />
                    <input
                      type="text"
                      value={editingQuizTitle}
                      onChange={(e) => setEditingQuizTitle(e.target.value)}
                      className="border rounded-lg px-2 py-1 text-sm"
                      placeholder="Quiz title"
                    />
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button
                        onClick={saveEditQuiz}
                        className="bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditQuiz}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 border border-yellow-200 rounded-lg p-3 bg-yellow-50 shadow-sm">
                    <HelpCircle size={18} className="text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">
                      {section.quizTitle || "Section Quiz (MCQ)"}
                    </span>
                    <button
                      onClick={() =>
                        startEditQuiz(
                          section.id,
                          section.quizTitle || "Section Quiz (MCQ)",
                        )
                      }
                      className="hover:bg-yellow-100 rounded-full p-1 transition"
                      title="Edit quiz"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-600"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteQuiz(section.id)}
                      className="hover:bg-red-100 rounded-full p-1 transition"
                      title="Delete quiz"
                    >
                      <Trash2
                        size={18}
                        className="text-red-500 cursor-pointer"
                      />
                    </button>
                  </div>
                ))}
              {/* Quiz View Modal */}
              {viewingQuiz && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setViewingQuiz(null)}
                      title="Close"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-bold mb-2">
                      {viewingQuiz.title}
                    </h3>
                    {viewingQuiz.desc && (
                      <div className="mb-4 text-gray-700">
                        {viewingQuiz.desc}
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-yellow-700">
                        Questions:
                      </span>
                      <ul className="list-disc ml-6 mt-2">
                        {viewingQuiz.questions.map((q, idx) => (
                          <li key={idx} className="text-gray-800 mb-1">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
