import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CertificatePage({ params }: any) {
  const session = await getServerSession(authOptions);

  const studentName = session?.user?.name || "Student Name";

  const courseName = "Full Stack Web Development";
  const instructor = "John Doe";
  const date = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-5xl p-12 shadow-2xl border border-gray-200 relative">

        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-400"></div>

        {/* Platform Name */}
        <div className="text-center mb-6">
          <h2 className="text-lg tracking-widest text-gray-500">
            CS MAJOR LMS
          </h2>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Certificate of Completion
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-8">
          This is to proudly certify that
        </p>

        {/* Student Name */}
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
          {studentName}
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600">
          has successfully completed the course
        </p>

        {/* Course Name */}
        <h3 className="text-2xl font-semibold text-center mt-3 mb-8">
          {courseName}
        </h3>

        {/* Details */}
        <div className="flex justify-center gap-10 text-gray-600 text-sm mb-10">
          <p>
            <span className="font-medium">Instructor:</span> {instructor}
          </p>
          <p>
            <span className="font-medium">Date:</span> {date}
          </p>
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end mt-12">

          {/* Instructor Signature */}
          <div className="text-center">
            <div className="border-t w-40 mb-2"></div>
            <p className="text-sm text-gray-600">{instructor}</p>
            <p className="text-xs text-gray-400">Instructor</p>
          </div>

          {/* Certificate ID */}
          <div className="text-center">
            <p className="text-xs text-gray-400">Certificate ID</p>
            <p className="text-sm font-mono text-gray-600">
              #{params.id}
            </p>
          </div>

          {/* Platform Signature */}
          <div className="text-center">
            <div className="border-t w-40 mb-2"></div>
            <p className="text-sm text-gray-600">CS MAJOR</p>
            <p className="text-xs text-gray-400">Authorized Signature</p>
          </div>

        </div>

        {/* Seal */}
        <div className="absolute bottom-10 right-10 w-20 h-20 border-4 border-green-500 rounded-full flex items-center justify-center text-green-500 font-bold text-sm opacity-80">
          VERIFIED
        </div>

      </div>
    </div>
  );
}