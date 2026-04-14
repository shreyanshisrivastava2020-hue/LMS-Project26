"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* =======================
   ABOUT PAGE
======================= */
export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl px-6 py-24 text-white"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About CS MAJOR
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Empowering students with high-quality computer science education
              designed for real-world success.
            </p>
          </div>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our mission is to make computer science education accessible,
              practical, and career-focused. We aim to bridge the gap between
              academic knowledge and industry requirements through expert-led
              courses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We envision a global platform where learners from anywhere can
              master programming, AI, cybersecurity, and emerging technologies —
              preparing them for the future of tech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">
              What Makes Us Different?
            </h2>
            <p className="mt-4 text-gray-600">
              We combine academic excellence with practical experience.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Industry Experts",
                desc: "Courses taught by professionals with real-world experience.",
                icon: "👨‍💻",
              },
              {
                title: "Project-Based Learning",
                desc: "Hands-on projects to strengthen your practical skills.",
                icon: "📂",
              },
              {
                title: "Flexible Learning",
                desc: "Learn anytime, anywhere at your own pace.",
                icon: "⏳",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl bg-white p-8 shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 sm:grid-cols-2 md:grid-cols-4 text-center">
          {[
            { value: "500+", label: "Courses" },
            { value: "50K+", label: "Students" },
            { value: "120+", label: "Expert Instructors" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="mb-8 text-white/90">
            Join thousands of learners building their future in tech.
          </p>

          <Link href="/login">
            <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100 transition">
              Join Now →
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
