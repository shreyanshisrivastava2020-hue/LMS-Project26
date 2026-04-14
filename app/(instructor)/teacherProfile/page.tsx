"use client";

import { Github, Linkedin, Globe, BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function InstructorProfile() {
  // ✅ FIXED TYPES
  const [instructor, setInstructor] = useState<{
    name: string;
    profileImage: string;
    bio: string;
    expertise: string[];
    createdCourses: any[];
    experience: number;
    socialLinks: {
      linkedin: string;
      github: string;
      website: string;
    };
  }>({
    name: "",
    profileImage: "",
    bio: "",
    expertise: [],
    createdCourses: [],
    experience: 0,
    socialLinks: {
      linkedin: "",
      github: "",
      website: "",
    },
  });

  // ✅ EDIT STATES
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience: 0,
    expertise: "",
    linkedin: "",
    github: "",
    website: "",
  });

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await fetch("/api/users/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { data } = await res.json();

        setInstructor({
          name: data.name,
          profileImage: data.profileImage
            ? data.profileImage
            : "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
          bio: data.bio,
          expertise: data.expertise || [], // ✅ SAFE
          experience: data.experience,
          createdCourses: data.createdCourses || [],
          socialLinks: data.socialLinks || {
            linkedin: "#",
            github: "#",
            website: "#",
          },
        });

        // ✅ SYNC FORM
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          experience: data.experience || 0,
          expertise: data.expertise?.join(", ") || "",
          linkedin: data.socialLinks?.linkedin || "",
          github: data.socialLinks?.github || "",
          website: data.socialLinks?.website || "",
        });
      } catch (error) {
        console.error("Error fetching instructor profile:", error);
      }
    };

    fetchInstructor();
  }, []);

  // ✅ SAVE FUNCTION
  const handleSave = () => {
    setInstructor({
      ...instructor,
      name: formData.name,
      bio: formData.bio,
      experience: formData.experience,
      expertise: formData.expertise
        ? formData.expertise.split(",").map((e) => e.trim())
        : [],
      socialLinks: {
        linkedin: formData.linkedin,
        github: formData.github,
        website: formData.website,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Banner */}
      <div className="h-60 bg-linear-to-r from-indigo-600 to-purple-600"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 -mt-20 relative">
          {/* ✅ EDIT BUTTON */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
          >
            Edit Profile
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <img
              src={
                instructor.profileImage ||
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              }
              className="w-40 h-40 rounded-xl object-cover border-4 border-white shadow-md"
            />

            {/* Instructor Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {instructor.name.toUpperCase()}
              </h1>

              <p className="text-gray-500 mt-1">
                {instructor.experience}+ Years Teaching Experience
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {instructor.bio}
              </p>

              {/* Expertise */}
              <div className="flex flex-wrap gap-2 mt-4">
                {instructor.expertise?.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-5">
                <a
                  href={instructor.socialLinks.linkedin}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href={instructor.socialLinks.github}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
                >
                  <Github size={18} />
                </a>

                <a
                  href={instructor.socialLinks.website}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-indigo-100"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <BookOpen className="text-indigo-600" size={28} />
            <div>
              <h3 className="text-xl font-bold">
                {instructor.createdCourses?.length || 0}
              </h3>
              <p className="text-gray-500 text-sm">
                {instructor.createdCourses?.length === 1 ? "Course" : "Courses"}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <Star className="text-indigo-600" size={28} />
            <div>
              <h3 className="text-xl font-bold">0.0</h3>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Courses by {instructor.name.toUpperCase()}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {instructor.createdCourses?.map((course: any) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-40">
                  <img
                    src={
                      course.thumbnail?.url || "/images/softwaredevelopment.jpg"
                    }
                    alt=""
                    className="w-full h-full"
                  />
                </div>

                <div className="p-4 mt-2">
                  <h3 className="font-semibold text-gray-800">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {course.level || "Beginner"} |{" "}
                    {course.category || "General"}
                  </p>

                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>{course.enrolledStudents?.length || 0} Students</span>
                    <span>⭐ {course.rating || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-125 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>

            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Full Name
              </label>
              <input
                className="w-full border p-2 rounded mt-1"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-semibold text-gray-600">Bio</label>
              <textarea
                className="w-full border p-2 rounded mt-1"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Teaching Experience (Years)
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded mt-1"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* Expertise */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Expertise (comma separated)
              </label>
              <input
                className="w-full border p-2 rounded mt-1"
                value={formData.expertise}
                onChange={(e) =>
                  setFormData({ ...formData, expertise: e.target.value })
                }
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                LinkedIn Profile
              </label>
              <input
                className="w-full border p-2 rounded mt-1"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                GitHub Profile
              </label>
              <input
                className="w-full border p-2 rounded mt-1"
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
              />
            </div>

            {/* Website */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Personal Website
              </label>
              <input
                className="w-full border p-2 rounded mt-1"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
