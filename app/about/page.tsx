export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Our LMS</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Empowering learners and educators through a modern, flexible,
          and accessible online learning platform.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="leading-7 text-gray-600">
          Our Learning Management System (LMS) is designed to bridge the gap
          between students and educators by providing an intuitive platform
          for creating, managing, and consuming high-quality courses.
          We aim to make education accessible, affordable, and engaging
          for everyone.
        </p>
      </section>

      {/* What We Offer */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                🎓 For Students
              </h3>
              <p className="text-gray-600">
                Access free and paid courses, track learning progress,
                and gain valuable skills from expert instructors.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                👩‍🏫 For Teachers
              </h3>
              <p className="text-gray-600">
                Create and manage courses, upload learning materials,
                and reach students worldwide with ease.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                📈 Growth & Analytics
              </h3>
              <p className="text-gray-600">
                Monitor course performance, track enrollments,
                and improve learning experiences using insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="leading-7 text-gray-600">
          We envision a world where education is not limited by geography
          or resources. Our platform is built to scale and evolve, ensuring
          that both instructors and learners have the tools they need to
          succeed in a digital-first world.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} Your LMS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}