import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow mt-6 p-4 text-center text-gray-800 md:ml-64">
      © {new Date().getFullYear()} LMS Admin Panel. All rights reserved.
    </footer>
  );
}
