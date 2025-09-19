import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import firebase from "../../firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

export default function Courses() {
  const db = firebase.db;

  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseFees, setCourseFees] = useState("");
  const [courseImg, setCourseImg] = useState("");
  const [allCourses, setAllCourses] = useState([]);


  useEffect(() => {
    getallCourses();
  }, [setAllCourses])

  let getallCourses = () => {
    const q = query(collection(db, "courses"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
      });
      setAllCourses(courses);      
    });
  };


  let handleFileUpload = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    let data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "wahab-ayan-LMS");
    data.append("cloud_name", "dw0yxu2o0");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/dw0yxu2o0/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    let uploadedImageURL = await res.json();
    console.log("Uploaded Image URL:", uploadedImageURL.url);
    setCourseImg(uploadedImageURL.url);
    // return uploadedImageURL;
  };

  let addNewCourse = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "courses"), {
        courseName,
        courseDesc,
        courseFees,
        courseImg,
      });

      setCourseName("");
      setCourseDesc("");
      setCourseFees("");
    } catch (error) {
      console.log(error);
    }
  };

  const dummyCourses = [
    {
      name: "React Basics",
      description: "Learn the fundamentals of React.js and component-based UI.",
      fees: "$100",
      img: "https://via.placeholder.com/300x200",
    },
    {
      name: "Node.js Mastery",
      description: "Backend development with Node.js and Express.js.",
      fees: "$120",
      img: "https://via.placeholder.com/300x200",
    },
    {
      name: "Python Intro",
      description: "Basics of Python programming and scripting.",
      fees: "$90",
      img: "https://via.placeholder.com/300x200",
    },
    {
      name: "UI/UX Design",
      description: "Design principles, wireframing, and prototyping.",
      fees: "$150",
      img: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="md:ml-64 pt-20 px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700">Manage Courses</h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow hover:opacity-90 cursor-pointer"
          >
            + Add Course
          </button>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((data, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={data.courseImg}
                alt={data.courseName}
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-800">
                  {data.courseName}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {data.courseDesc}
                </p>
                <p className="mt-3 text-indigo-600 font-bold">Rs.{data.courseFees}</p>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg transform scale-95 animate-slideUp">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  ➕ Add New Course
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={addNewCourse} className="space-y-5">
                <input
                  type="text"
                  placeholder="Course Name"
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <textarea
                  placeholder="Description"
                  rows="3"
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                ></textarea>
                <input
                  type="text"
                  placeholder="Fees"
                  onChange={(e) => setCourseFees(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow hover:opacity-90 cursor-pointer"
                  >
                    Save Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
