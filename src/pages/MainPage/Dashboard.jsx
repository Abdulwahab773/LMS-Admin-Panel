import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaUserGraduate,
  FaUserPlus,
  FaCode,
  FaPaintBrush,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Cards";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import { collection, getDocs } from "@firebase/firestore";
import firebase from "../../firebase";

const db = firebase.db;

export default function Dashboard() {
  const navigate = useNavigate();

  // const courses = [
  //   {
  //     title: "React Basics",
  //     desc: "Intro to React fundamentals",
  //     icon: <FaCode className="text-indigo-600" size={28} />,
  //   },
  //   {
  //     title: "Node.js Mastery",
  //     desc: "Backend with Node.js",
  //     icon: <FaNodeJs className="text-green-600" size={28} />,
  //   },
  //   {
  //     title: "UI/UX Design",
  //     desc: "Learn design principles",
  //     icon: <FaPaintBrush className="text-pink-500" size={28} />,
  //   },
  //   {
  //     title: "Python for Beginners",
  //     desc: "Start coding with Python",
  //     icon: <FaPython className="text-yellow-500" size={28} />,
  //   },
  // ];


let  [applicantsSize ,setapplicantsSize] = useState("")
let  [courseSize ,SetcourseSize] = useState("")
let [enrolled , setEnrolled ] = useState("")

let [applicants , setapplicants] = useState([])
let [courses ,setCourses] = useState([])

  
  const getApplicants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "applicants"));
      
      setapplicantsSize(querySnapshot.size);
  
      let applicantsArr = [];
      querySnapshot.forEach((doc) => {
       
        applicantsArr.push(doc.data()); 
      });
  
      setapplicants(applicantsArr); 
    } catch (error) {
      console.error("Error getting applicants: ", error);
    }
  };


  const getCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      // console.log("Total Courses:", querySnapshot.size);
      SetcourseSize(querySnapshot.size)
      let coursesArr = [];
      querySnapshot.forEach((doc) => {
        coursesArr.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
     
      setCourses(coursesArr); 
    } catch (error) {
      console.error("Error getting courses: ", error);
    }
  };

  
  const getEnrolled = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Enrolled"));
      console.log("Total Enrolled Students:", querySnapshot.size);
      setEnrolled(querySnapshot.size)
  
      querySnapshot.forEach((doc) => {
        console.log("Enrolled Student:", doc.id, doc.data());
      });
    } catch (error) {
      console.error("Error getting enrolled students: ", error);
    }
  };
  
  
  useEffect(()=>{
    getCourses();
    getEnrolled()

    getApplicants();

  },[])
  



  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="md:ml-64 pt-20 px-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
          Dashboard Overview
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="All Courses"
            value={courseSize}
            icon={<FaBookOpen size={36} />}
            color="from-purple-500 to-purple-700"
          />
          <Card
            title="Enrolled Students"
            value={enrolled}
            icon={<FaUserGraduate size={36} />}
            color="from-blue-500 to-blue-700"
          />
          <Card
            title="Applicants"
            value={applicantsSize}
            icon={<FaUserPlus size={36} />}
            color="from-green-500 to-green-700"
          />
        </div>

        
        <div className="mt-12 bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Recent Courses
            </h3>
            <button
              onClick={() => navigate("/courses")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              Manage Courses
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course, idx) => (
  <div
    key={course.id}
    className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-start gap-4"
  >
    <div className="p-3 bg-gray-200 rounded-lg">
      {/* Agar Firestore mein icon nahi hai to placeholder use karo */}
      {course.icon || "📘"}
    </div>
    <div>
      <h4 className="font-semibold text-lg text-gray-700">
        {course.courseName}
      </h4>
      <p className="text-sm text-gray-500 mt-2">{course.courseDesc}</p>
    </div>
  </div>
))}

          </div>
        </div>

      
        <div className="mt-12 bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              New Applicants
            </h3>
            <button
              onClick={() => navigate("/applicants")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           

{applicants.slice(0, 3).map((app, idx) => (
  <div key={idx} className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition flex items-center gap-4">
    <img
      src={app.userImg}
      alt={app.UsreName}
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <h4 className="font-semibold text-lg text-gray-700">
        {app.UsreName}
      </h4>
      <p className="text-sm text-gray-500">
        Applied for {app.userCourseSelect}
      </p>
    </div>
  </div>
))}



          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
