import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/navbar";
import { getDocs, collection } from "firebase/firestore";
import firebase from "../../firebase";


export default function Students() {

  const db = firebase.db;


  const [allStudents, setAllStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  
  const filteredStudents =
  filter === "All"
    ? allStudents
    : allStudents.filter(
        (s) =>
          s.userCourse?.toLowerCase().trim() === filter.toLowerCase().trim()
      );

  
  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Enrolled"));
        const studentsArray = [];
        querySnapshot.forEach((doc) => {
          console.log("📌 Enrolled Student:", { id: doc.id, ...doc.data() });
          studentsArray.push({ id: doc.id, ...doc.data() });
        });
        setAllStudents(studentsArray);
      } catch (error) {
        console.error("❌ Error fetching enrolled students:", error);
      }
    };
  
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesArray = [];
        querySnapshot.forEach((doc) => {
          const courseData = doc.data();
          if (courseData.courseName) {
            coursesArray.push(courseData.courseName);
          }
        });
        setCourses(coursesArray);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
      }
    };
  
    fetchEnrolled();
    fetchCourses();
  }, []);
     







  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="md:ml-64 pt-20 px-8">
       
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">All Students</h2>
          <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="mt-3 sm:mt-0 border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-1 focus:ring-indigo-500 cursor-pointer"
  >
    <option value="All">All</option>
    {courses.map((course, idx) => {
      console.log("📘 Course Option:", course);
      return (
        <option key={idx} value={course}>
          {course}
        </option>
      );
    })}
  </select>



        </div>

       
        <ul className="space-y-4">
          {filteredStudents.length === 0 ? (
            <div className="p-6 bg-gray-50 rounded-xl text-gray-500 shadow-sm">
              No students found for this course
            </div>
          ) : (
            filteredStudents.map((student, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
                onClick={() => console.log("Clicked:", student.userName)}
              >
                
                <div className="flex items-center gap-4">
                  <img
                    src={student.userImg}
                    alt={student.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {student.userName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Enrolled in <span className="font-medium text-indigo-600">{student.userCourse}</span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                    student.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {student.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}
