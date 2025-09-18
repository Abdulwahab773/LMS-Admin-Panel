import React from "react";

export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 ml-64 ">
      <h1 className="text-xl font-semibold text-gray-700">Welcome, Admin 👋</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-500">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-10 h-10 border-2 border-indigo-600"
        />
      </div>
    </div>
  );
}
