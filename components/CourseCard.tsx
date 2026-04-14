"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Globe,
  BookOpen,
  Users,
  Star,
  Clock,
} from "lucide-react";
import Image from "next/image";

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

export default function CourseCard({
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
