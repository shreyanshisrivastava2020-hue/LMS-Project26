"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Course = {
  title: string;
  instructor: number;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
};

const CreateCoursePage = () => {
  const [formData, setFormData] = useState<Omit<Course, "instructor">>({
    title: "",
    description: "",
    level: "Beginner",
    duration: "",
    category: "",
  });

  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Partial<Record<keyof Course, string>>>(
    {},
  );

  // ✅ Validation
  const validate = () => {
    const newErrors: Partial<Record<keyof Course, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Input handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Thumbnail + Preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // ✅ Cleanup preview memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formPayload = new FormData();

    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("level", formData.level);
    formPayload.append("duration", formData.duration);
    formPayload.append("category", formData.category);

    if (thumbnail) {
      formPayload.append("thumbnail", thumbnail);
    }

    const res = await fetch("/api/course/createCourse", {
      method: "POST",
      body: formPayload,
    });

    if (res.ok) {
      toast.success("Course Created Successfully!", {
        className: "bg-green-600 text-white",
      });
      router.push("/my-courses");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-black min-h-screen px-10 py-8">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold ">Create New Course</h1>
        <p className="text-gray-500 mt-1">
          Add the basic details for your course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">
        {/* Course Title */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium ">Course Title</h3>
            <p className="text-sm text-gray-500">
              Write a clear and descriptive title
            </p>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-500 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium ">Description</h3>
            <p className="text-sm text-gray-500">
              Describe what students will learn
            </p>
          </div>

          <div className="col-span-2">
            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-2 border-gray-500 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Level */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium ">Course Level</h3>
            <p className="text-sm text-gray-500">Select difficulty level</p>
          </div>

          <div className="col-span-2">
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border-2 border-gray-500 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium ">Duration</h3>
            <p className="text-sm text-gray-500">Estimated time to complete</p>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="duration"
              placeholder="e.g. 8 weeks"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border-2 border-gray-500 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium ">Category</h3>
            <p className="text-sm text-gray-500">Course subject or field</p>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-500 text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="font-medium ">Course Thumbnail</h3>
            <p className="text-sm text-gray-500">
              Upload an image that represents your course
            </p>
          </div>

          <div className="col-span-2 flex gap-6 items-start">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full border-2 border-gray-500 text-black rounded-md p-3"
              />

              {thumbnail && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {thumbnail.name}
                </p>
              )}
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-28 object-cover rounded-md border"
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-6 border-t">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
