"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CoursePage() {
  const params = useParams();
  const slug = params?.slug; // optional chaining to avoid null

  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    if (!slug) return; //  guard if slug is undefined
    fetch(`/api/courses/${slug}`)
      .then(res => res.json())
      .then(data => setCourse(data.course));
  }, [slug]);

  const enroll = async () => {
    if (!slug) return; // extra safety
    await fetch(`/api/courses/${slug}/enroll`, {
      method: "POST",
    });
    alert("Enrolled Successfully ");
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-4">{course.description}</p>
      <div className="mt-6">
        <button
          onClick={enroll}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}