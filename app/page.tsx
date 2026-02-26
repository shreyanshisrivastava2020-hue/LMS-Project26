"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import Link from "next/link";

/* =======================
   COURSE CARD COMPONENT
======================= */
type CourseCardProps = {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  instructor: string;
  rating: number;
  students: string;
  duration: string;
  image: string;
};

function CourseCard({
  level,
  title,
  instructor,
  rating,
  students,
  duration,
  image,
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-2xl overflow-hidden bg-white shadow-lg border group"
    >
      {/* IMAGE */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <span className="absolute top-4 left-4 z-10 text-xs px-3 py-1 rounded-full bg-blue-500 text-white">
          {level}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg leading-tight group-hover:text-blue-600 transition">
          {title}
        </h3>

        <p className="text-sm text-gray-500">By {instructor}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            {rating}
          </span>
          <span>{students}</span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {duration}
          </span>

          <button className="text-sm font-medium text-blue-600 hover:underline">
            Enroll Now →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* =======================
   WHY CHOOSE CS SECTION (ENHANCED)
======================= */
function WhyChooseCS() {
  const features = [
    {
      title: "Expert-Led Learning",
      desc: "Learn from industry professionals and academic experts with real-world experience.",
      icon: "🎓",
    },
    {
      title: "Career-Focused Curriculum",
      desc: "Structured learning paths designed to prepare you for real jobs and interviews.",
      icon: "🚀",
    },
    {
      title: "Smart Progress Tracking",
      desc: "Visual dashboards, assignments, and milestones to keep you motivated.",
      icon: "📊",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50 py-28">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Why Choose <span className="text-blue-600">CS MAJOR</span>?
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            A modern learning platform crafted to help you master computer
            science faster and smarter.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative rounded-3xl border bg-white/80 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl shadow-lg">
                  {f.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {f.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =======================
   FEATURED COURSES SECTION
======================= */
function FeaturedCourses() {
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
/* =======================
   READY TO START LEARNING CTA
======================= */
function ReadyToStartLearning() {
  return (
    <section className="px-6 py-24 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          mx-auto max-w-7xl
          rounded-2xl
          bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600
          px-6 py-16
          text-center
          text-white
          shadow-2xl
        "
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Learning?
        </h2>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10">
          Join our community of learners and take your skills to the next level.
        </p>

        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
            inline-flex items-center gap-2
            rounded-lg
            bg-white px-7 py-3
            font-semibold
            text-blue-600
            shadow-lg
            hover:bg-gray-100
            transition
          "
          >
            Access Your Dashboard →
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
/* =======================
   FOOTER
======================= */
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 text-white text-lg font-semibold">
            🎓 CS MAJOR
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            A modern learning platform covering all aspects of computer science,
            from fundamentals to advanced technologies.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Courses</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">Dashboard</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-slate-400 mb-4">
            Subscribe to get the latest updates and new courses.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-lg px-4 py-2 text-sm text-gray-900 focus:outline-none"
            />
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} CS MAJOR. All rights reserved.
      </div>
    </footer>
  );
}

/* =======================
   HOME PAGE
======================= */
export default function HomePage() {
  const categories = [
    {
      title: "Software Development",
      courses: 127,
      image: "/images/softwaredevelopment.jpg",
      iconBg: "bg-blue-400",
      icon: "💻",
    },
    {
      title: "Database Systems",
      courses: 84,
      image: "/images/databsesystems.png",
      iconBg: "bg-green-400",
      icon: "🗄️",
    },
    {
      title: "Cyber Security",
      courses: 64,
      image: "/images/cybersecurity.jpg",
      iconBg: "bg-red-400",
      icon: "🛡️",
    },
    {
      title: "Mobile App Development",
      courses: 58,
      image: "/images/mobileappdev.jpg",
      iconBg: "bg-purple-300",
      icon: "📱",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 py-24"
        >
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Master Computer Science Skills for the Future
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Join thousands of students learning from industry experts. Access
              500+ courses in programming, AI, cybersecurity, and more.
            </p>

            <div className="mt-10 flex gap-4">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
            inline-flex items-center gap-2
            rounded-lg
            bg-white px-7 py-3
            font-semibold
            text-blue-600
            shadow-lg
            hover:bg-gray-100
            transition
          "
                >
                  Go to Dashboard →
                </motion.button>
              </Link>
              <button className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white">
                Browse Courses
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore by Category
            </h2>
            <p className="mt-3 text-gray-600">
              Choose from our comprehensive range of computer science topics
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {categories.map((dog) => (
              <motion.div
                key={dog.title}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-xl border bg-white hover:shadow-xl transition"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={dog.image}
                    alt={dog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div
                    className={`absolute top-4 right-4 h-11 w-11 rounded-xl ${dog.iconBg} flex items-center justify-center text-white text-lg shadow-lg`}
                  >
                    {dog.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {dog.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {dog.courses} courses available
                  </p>
                  <button className="mt-4 text-sm font-semibold text-blue-600">
                    Explore →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CS */}
      <WhyChooseCS />

      {/* FEATURED COURSES */}
      <FeaturedCourses />
      {/* READY TO START LEARNING */}
      <ReadyToStartLearning />
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
