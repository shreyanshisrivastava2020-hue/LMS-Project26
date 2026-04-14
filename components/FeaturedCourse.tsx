import CourseCard from "./CourseCard";

/* =======================
   FEATURED COURSES SECTION
======================= */
export function FeaturedCourses() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
          <p className="text-gray-500 mt-2">
            Top-rated courses from expert instructors
          </p>
        </div>

        <a className="text-blue-600 font-medium hover:underline">View All →</a>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <CourseCard
          level="Intermediate"
          title="Data Structures & Algorithms"
          instructor="Dr. Sarah Chen"
          rating={4.8}
          students="12,500+"
          duration="12 weeks"
          image="/images/dsa.jpg"
        />

        <CourseCard
          level="Beginner"
          title="Web Development Fundamentals"
          instructor="Paul Marcus Evans"
          rating={4.6}
          students="18,000+"
          duration="10 weeks"
          image="/images/webdev.jpg"
        />

        <CourseCard
          level="Advanced"
          title="Machine Learning & AI"
          instructor="Andrew K. Miller"
          rating={4.9}
          students="9,200+"
          duration="14 weeks"
          image="/images/mlai.jpg"
        />

        <CourseCard
          level="Intermediate"
          title="Cyber Security Essentials"
          instructor="Lisa Rodriguez"
          rating={4.7}
          students="11,300+"
          duration="8 weeks"
          image="/images/cyberessential.webp"
        />
      </div>
    </section>
  );
}
