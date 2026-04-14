"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Trophy, BarChart3, Bot, Database } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Interactive Visual Learning",
      description:
        "Dynamic and interactive visualizations for data structures and algorithms that help students understand complex concepts through real-time graphical representations.",
      icon: BarChart3,
    },
    {
      title: "Built-in Browser Code Editor",
      description:
        "A lightweight in-browser coding environment with syntax highlighting, auto-save functionality, and real-time execution support to bridge theory with hands-on practice.",
      icon: Code2,
    },
    {
      title: "AI-Powered Academic Assistant",
      description:
        "An intelligent chatbot integrated using OpenAI API that provides instant academic assistance, concept explanations, and coding guidance 24/7.",
      icon: Bot,
    },
    {
      title: "Personalized Recommendation System",
      description:
        "A dynamic recommendation engine that suggests courses, quizzes, and learning resources based on student interests and activity patterns.",
      icon: Brain,
    },
    {
      title: "Gamified Quiz & Leaderboard System",
      description:
        "Performance-based leaderboards and interactive quizzes designed to boost student engagement, encourage competition, and increase motivation.",
      icon: Trophy,
    },
    {
      title: "Centralized Learning Management",
      description:
        "A unified platform built using React.js, Node.js, Express.js, and MongoDB to provide seamless course access, progress tracking, and structured learning pathways.",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          An innovative and student-centric Learning Management System
          engineered specifically for Computer Science education. Our platform
          integrates theory, practical coding, AI assistance, and gamified
          learning into one immersive ecosystem.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
                <Icon size={22} />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Call To Action */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Empowering Computer Science Learning
        </h2>
        <p className="text-gray-600 mb-6">
          Our LMS is designed to transform passive learning into interactive,
          hands-on, and engaging educational experiences.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Explore Platform
        </button>
      </div>
    </div>
  );
}
