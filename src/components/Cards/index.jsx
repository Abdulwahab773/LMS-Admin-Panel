import React from "react";

export default function Card({ title, value, color, icon }) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg bg-gradient-to-r ${color} text-white flex items-center gap-6 transform hover:scale-105 transition duration-300 cursor-pointer`}
    >
      <div className="bg-white/20 p-4 rounded-xl">{icon}</div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
