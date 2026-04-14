import { motion } from "framer-motion";

/* =======================
   READY TO START LEARNING CTA
======================= */
export function ReadyToStartLearning() {
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

        <motion.a
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
          href="/login"
        >
          Access Your Dashboard →
        </motion.a>
      </motion.div>
    </section>
  );
}
