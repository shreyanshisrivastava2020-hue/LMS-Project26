import { motion } from "framer-motion";
import Link from "next/link";

/* HERO */

export function Hero() {
  return (
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
            <Link href="/login" passHref>
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
  );
}
