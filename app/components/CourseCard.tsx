"use client";

interface Props {
  title: string;
  progress: number;
}

export default function CourseCard({ title, progress }: Props) {
  return (
    <div className="course-card">
      <h3>{title}</h3>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{progress}% Complete</p>

      <button className="continue-btn">Continue Learning →</button>
    </div>
  );
}
