import React from "react";
import { FaBookOpen, FaUserGraduate, FaUserPlus, FaCode, FaPaintBrush, FaNodeJs, FaPython } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Cards";

export default function Dashboard() {
  const navigate = useNavigate();

  const courses = [
    { title: "React Basics", desc: "Intro to React fundamentals", icon: <FaCode className="text-indigo-600" size={28} /> },
    { title: "Node.js Mastery", desc: "Backend with Node.js", icon: <FaNodeJs className="text-green-600" size={28} /> },
    { title: "UI/UX Design", desc: "Learn design principles", icon: <FaPaintBrush className="text-pink-500" size={28} /> },
    { title: "Python for Beginners", desc: "Start coding with Python", icon: <FaPython className="text-yellow-500" size={28} /> },
  ];

  const applicants = [
    { name: "Sara", course: "React Basics", avatar: "https://i.pravatar.cc/150?img=47" },
    { name: "Bilal", course: "Node.js Mastery", avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Hamza", course: "UI/UX Design", avatar: "https://i.pravatar.cc/150?img=33" },
    { name: "Ayesha", course: "Python for Beginners", avatar: "https://i.pravatar.cc/150?img=22" },
  ];

  return (
    <div className="ml-64 pt-20 px-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        Dashboard Overview
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          title="All Courses"
          value="5"
          icon={<FaBookOpen size={36} />}
          color="from-purple-500 to-purple-700"
        />
        <Card
          title="Enrolled Students"
          value="25"
          icon={<FaUserGraduate size={36} />}
          color="from-blue-500 to-blue-700"
        />
        <Card
          title="Applicants"
          value="10"
          icon={<FaUserPlus size={36} />}
          color="from-green-500 to-green-700"
        />
      </div>

      {/* Recent Courses Section */}
      <div className="mt-12 bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Recent Courses</h3>
          <button
            onClick={() => navigate("/courses")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Manage Courses
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-start gap-4"
            >
              <div className="p-3 bg-gray-200 rounded-lg">{course.icon}</div>
              <div>
                <h4 className="font-semibold text-lg text-gray-700">
                  {course.title}
                </h4>
                <p className="text-sm text-gray-500 mt-2">{course.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Applicants Section */}
      <div className="mt-12 bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700">New Applicants</h3>
          <button
            onClick={() => navigate("/applicants")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicants.slice(0, 3).map((app, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-4"
            >
              <img
                src={app.avatar}
                alt={app.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg text-gray-700">{app.name}</h4>
                <p className="text-sm text-gray-500">Applied for {app.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
