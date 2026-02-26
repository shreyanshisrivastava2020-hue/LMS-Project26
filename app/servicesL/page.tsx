export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We provide powerful tools and solutions to enhance online learning
          for both students and instructors.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Course Creation */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📚 Course Creation</h3>
            <p className="text-gray-600">
              Teachers can create, manage, and publish courses with videos,
              PDFs, quizzes, and structured modules.
            </p>
          </div>

          {/* Student Enrollment */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📝 Easy Enrollment</h3>
            <p className="text-gray-600">
              Students can enroll in free or paid courses, access learning
              materials instantly, and start learning anytime.
            </p>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">📊 Progress Tracking</h3>
            <p className="text-gray-600">
              Track course completion, monitor performance, and visualize
              learning progress through dashboards.
            </p>
          </div>

          {/* Secure Payments */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">💳 Secure Payments</h3>
            <p className="text-gray-600">
              Integrated payment system for paid courses with secure and
              reliable transactions.
            </p>
          </div>

          {/* Instructor Dashboard */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">👩‍🏫 Instructor Dashboard</h3>
            <p className="text-gray-600">
              Dedicated dashboard for teachers to manage courses,
              students, and performance analytics.
            </p>
          </div>

          {/* Certification */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">🏆 Certificates</h3>
            <p className="text-gray-600">
              Generate course completion certificates to recognize
              student achievements.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">
          Start Your Learning Journey Today
        </h2>
        <p className="mb-6">
          Join our LMS platform and unlock your potential.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Your LMS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}