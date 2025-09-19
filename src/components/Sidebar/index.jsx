import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaUsers,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-indigo-700 p-2 rounded-lg cursor-pointer shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-indigo-600 flex items-center justify-between">
          Admin Panel
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={18} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                isActive ? "bg-indigo-600 shadow-md" : "hover:bg-indigo-600"
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                isActive ? "bg-indigo-600 shadow-md" : "hover:bg-indigo-600"
              }`
            }
          >
            <FaBook /> Manage Courses
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                isActive ? "bg-indigo-600 shadow-md" : "hover:bg-indigo-600"
              }`
            }
          >
            <FaUserGraduate /> All Students
          </NavLink>

          <NavLink
            to="/applicants"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                isActive ? "bg-indigo-600 shadow-md" : "hover:bg-indigo-600"
              }`
            }
          >
            <FaUsers /> Applicants
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition cursor-pointer ${
                isActive ? "bg-indigo-600 shadow-md" : "hover:bg-indigo-600"
              }`
            }
          >
            <FaCog /> Settings
          </NavLink>
        </nav>
      </div>
    </>
  );
}
