'use client';

import { useEffect, useState } from "react";

interface Certificate {
  _id: string;
  studentName: string;
  courseName: string;
  instructor: string;
  date: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("/api/certificate");
        const data = await res.json();
        setCertificates(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Certificates 🎓</h1>

      {certificates.length === 0 ? (
        <p>No certificates earned yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{cert.courseName}</h2>
              <p className="text-sm text-gray-600">
                Instructor: {cert.instructor}
              </p>

              <p className="mt-2 text-sm">
                Issued to: <strong>{cert.studentName}</strong>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Date: {new Date(cert.date).toLocaleDateString()}
              </p>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() =>
                  window.open(`/certificate/${cert._id}`, "_blank")
                }
              >
                View Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}