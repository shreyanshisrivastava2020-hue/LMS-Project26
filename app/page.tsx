"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WhyChooseCS } from "@/components/WhyChooseUs";
import { FeaturedCourses } from "@/components/FeaturedCourse";
import { ReadyToStartLearning } from "@/components/ReadyToStartLearn";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

/* =======================
   HOME PAGE
======================= */
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
export default function HomePage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Hero />

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
            {categories.map((category) => (
              <motion.div
                key={category.title}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-xl border bg-white hover:shadow-xl transition"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div
                    className={`absolute top-4 right-4 h-11 w-11 rounded-xl ${category.iconBg} flex items-center justify-center text-white text-lg shadow-lg`}
                  >
                    {category.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {category.courses} courses available
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
