'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Calendar } from "lucide-react";

interface Certificate {
  _id: string;
  courseName: string;
  instructor: string;
  date: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCertificates([
      {
        _id: "1",
        courseName: "Full Stack Web Development",
        instructor: "John Doe",
        date: new Date().toISOString(),
      },
      {
        _id: "2",
        courseName: "Data Structures & Algorithms",
        instructor: "Jane Smith",
        date: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">

      {/* 🔥 Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
          🎓 My Certificates
        </h1>
        <p className="text-gray-500 mt-2">
          Showcase your achievements and download certificates
        </p>
      </div>

      {/* Empty State */}
      {certificates.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          No certificates yet 😔
        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              onClick={() => router.push(`/certificate/${cert._id}`)}
              className="group relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-green-200/30 to-emerald-200/30 blur-xl"></div>

              {/* Top Section */}
              <div className="relative flex justify-between items-center mb-4">
                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  <Award size={14} />
                  Completed
                </span>

                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={14} />
                  {new Date(cert.date).toLocaleDateString()}
                </span>
              </div>

              {/* Course Title */}
              <h2 className="relative text-lg font-semibold mb-2 group-hover:text-green-600 transition">
                {cert.courseName}
              </h2>

              {/* Instructor */}
              <p className="relative text-sm text-gray-500 mb-4">
                Instructor: {cert.instructor}
              </p>

              {/* Divider */}
              <div className="relative border-t my-4"></div>

              {/* Footer */}
              <div className="relative flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  ID: #{cert._id}
                </span>

                <span className="text-green-600 font-medium group-hover:underline">
                  View →
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}