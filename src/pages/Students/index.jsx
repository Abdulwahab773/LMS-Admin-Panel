import React, { useState } from "react";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/navbar";

export default function Students() {
  const allStudents = [
    {
      name: "Ali Khan",
      course: "Web Development",
      status: "Active",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ayesha Siddiqui",
      course: "UI/UX Design",
      status: "Inactive",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Wahab Ahmed",
      course: "React JS",
      status: "Active",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Hina Fatima",
      course: "Data Science",
      status: "Active",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },

  ];

  const [filter, setFilter] = useState("All");

  // Filtered students based on dropdown
  const filteredStudents =
    filter === "All"
      ? allStudents
      : allStudents.filter((s) => s.course === filter);

  const courses = ["All", "Web Development", "UI/UX Design", "React JS", "Data Science"];

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="md:ml-64 pt-20 px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">All Students</h2>

          {/* Dropdown Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-3 sm:mt-0 border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm  focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {courses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Students List */}
        <ul className="space-y-4">
          {filteredStudents.length === 0 ? (
            <div className="p-6 bg-gray-50 rounded-xl text-gray-500 shadow-sm">
              No students found for this course
            </div>
          ) : (
            filteredStudents.map((student, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
                onClick={() => console.log("Clicked:", student.name)}
              >
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  <img
                    src={student.img}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {student.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Enrolled in <span className="font-medium text-indigo-600">{student.course}</span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                    student.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {student.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}
