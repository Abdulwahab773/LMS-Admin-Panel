import React from "react";

export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow-xl  flex items-center justify-between px-6 md:ml-64 ">
      <h1 className="text-xl font-semibold text-gray-700 ml-10 md:ml-0">Welcome, Admin 👋</h1>
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-12 h-12 border-2 border-indigo-600"
        />
      </div>
    </div>
  );
}
