import React from "react";

export default function Students() {
  return (
    <div className="ml-64 pt-20 px-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">All Students</h2>
      <ul className="space-y-4">
        {["Ali", "Ayesha", "Wahab", "Hina"].map((student, idx) => (
          <li
            key={idx}
            className="p-4 bg-white shadow rounded-lg flex justify-between"
          >
            <span className="font-semibold">{student}</span>
            <span className="text-sm text-gray-500">Enrolled</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
