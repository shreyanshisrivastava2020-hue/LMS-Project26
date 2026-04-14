import { motion } from "framer-motion";
/* =======================
   WHY CHOOSE CS SECTION (ENHANCED)
======================= */
export function WhyChooseCS() {
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
