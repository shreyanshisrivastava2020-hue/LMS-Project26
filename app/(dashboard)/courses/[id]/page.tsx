'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const params = useParams();

  const id = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const [course, setCourse] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const lesson = course.lessons?.[currentLesson];

  if (!lesson) return <p>No lesson found</p>;

  return (
    <div>
      <h1>{course.title}</h1>

      <video src={lesson.videoUrl} controls width="500" />

      <br />

      <a href={lesson.pdfUrl} target="_blank">
        Open PDF
      </a>

      <br /><br />

      <button
        onClick={() =>
          setCurrentLesson(prev =>
            prev + 1 < course.lessons.length ? prev + 1 : prev
          )
        }
      >
        Next Lesson
      </button>
    </div>
  );
}