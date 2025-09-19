import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

export default function Applicants() {
  const dummyApplicants = [
    {
      name: "Sara",
      course: "React Basics",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bilal",
      course: "Node.js Mastery",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Hamza",
      course: "Python Intro",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Hamza",
      course: "Python Intro",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Hamza",
      course: "Python Intro",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="md:ml-64 pt-20 px-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-8">
          All Applicants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyApplicants.map((applicant, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={applicant.img}
                  alt={applicant.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {applicant.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Applied for {applicant.course}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6">
                <button className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow hover:opacity-90 cursor-pointer">
                  View Application
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}
