export default function TeacherDashboard() {
  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your courses, students and earnings.
          </p>
        </div>


      </div>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* Total Courses */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <h2 className="text-3xl font-semibold mt-2 text-gray-900">8</h2>
            </div>
            <div className="h-10 w-10 bg-indigo-100 rounded-lg"></div>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h2 className="text-3xl font-semibold mt-2 text-gray-900">320</h2>
            </div>
            <div className="h-10 w-10 bg-green-100 rounded-lg"></div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h2 className="text-3xl font-semibold mt-2 text-gray-900">
                ₹24,000
              </h2>
            </div>
            <div className="h-10 w-10 bg-yellow-100 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Recent Courses Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Courses
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="flex justify-between items-center p-6">
            <div>
              <p className="font-medium text-gray-900">
                Full Stack MERN Development
              </p>
              <p className="text-sm text-gray-500 mt-1">
                120 students enrolled
              </p>
            </div>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              Manage
            </button>
          </div>

          <div className="flex justify-between items-center p-6">
            <div>
              <p className="font-medium text-gray-900">
                Advanced React Patterns
              </p>
              <p className="text-sm text-gray-500 mt-1">
                85 students enrolled
              </p>
            </div>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              Manage
            </button>
          </div>

          <div className="flex justify-between items-center p-6">
            <div>
              <p className="font-medium text-gray-900">
                Node.js Backend Mastery
              </p>
              <p className="text-sm text-gray-500 mt-1">
                40 students enrolled
              </p>
            </div>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              Manage
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}