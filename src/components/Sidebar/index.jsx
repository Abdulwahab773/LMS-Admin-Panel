import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-700 to-indigo-900 text-white fixed top-0 left-0 shadow-xl">
      <div className="p-6 text-2xl font-bold border-b border-indigo-600">
        Admin Panel
      </div>
      <nav className="mt-6 flex flex-col gap-4 px-4">
        <Link
          to="/"
          className="hover:bg-indigo-600 p-3 rounded-lg transition cursor-pointer"
        >
          Dashboard
        </Link>
        <Link
          to="/courses"
          className="hover:bg-indigo-600 p-3 rounded-lg transition cursor-pointer"
        >
          Manage Courses
        </Link>
        <Link
          to="/students"
          className="hover:bg-indigo-600 p-3 rounded-lg transition cursor-pointer"
        >
          All Students
        </Link>
        <Link
          to="/applicants"
          className="hover:bg-indigo-600 p-3 rounded-lg transition cursor-pointer"
        >
          Applicants
        </Link>
        <Link
          to="/settings"
          className="hover:bg-indigo-600 p-3 rounded-lg transition cursor-pointer"
        >
          Settings
        </Link>
        
      </nav>
    </div>
  );
}
