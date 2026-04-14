"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "student",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your message has been submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact Support</h1>
        <p className="text-gray-500 mt-3">
          We're here to help you with courses, instructors, and platform issues.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT - CONTACT INFO */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md flex gap-4">
            <Mail className="text-indigo-600" />
            <div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-gray-500 text-sm">support@lms.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex gap-4">
            <Phone className="text-indigo-600" />
            <div>
              <h3 className="font-semibold">Call Us</h3>
              <p className="text-gray-500 text-sm">+91 98765 43210</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex gap-4">
            <MapPin className="text-indigo-600" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-500 text-sm">Lucknow, India</p>
            </div>
          </div>

          {/* Support Type */}
          <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">Need Specific Help?</h3>
            <ul className="text-sm mt-3 space-y-2">
              <li>• Student Queries (Courses, Progress)</li>
              <li>• Instructor Help (Upload, Earnings)</li>
              <li>• Business / Partnerships</li>
            </ul>
          </div>
        </div>

        {/* CENTER - FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Send us a message
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="student">Student Support</option>
            <option value="instructor">Instructor Support</option>
            <option value="business">Business Inquiry</option>
          </select>

          <textarea
            name="message"
            rows={5}
            placeholder="Describe your issue or question..."
            required
            value={form.message}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Submit Request
          </button>
        </motion.form>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm flex gap-3">
            <HelpCircle className="text-indigo-500" />
            <div>
              <h3 className="font-medium">How do I upload a course?</h3>
              <p className="text-sm text-gray-500">
                Go to Instructor Dashboard → Manage Courses → Add Content.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm flex gap-3">
            <HelpCircle className="text-indigo-500" />
            <div>
              <h3 className="font-medium">How do students access content?</h3>
              <p className="text-sm text-gray-500">
                After enrolling, students can access videos, PDFs, and quizzes.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm flex gap-3">
            <HelpCircle className="text-indigo-500" />
            <div>
              <h3 className="font-medium">
                How are instructor earnings calculated?
              </h3>
              <p className="text-sm text-gray-500">
                Earnings are based on course purchases and engagement metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
