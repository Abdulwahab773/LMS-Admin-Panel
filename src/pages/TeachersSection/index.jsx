import React, { useEffect, useState } from "react";
import {
  FaUserPlus,
  FaArrowLeft,
  FaClock,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import firebase from "../../firebase";

const db = firebase.db;


export default function TeachersSection() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [skills, setSkills] = useState("");
  const [days, setDays] = useState("");
  const [timings, setTimings] = useState("");

  const addTeacher = async () => {
    if (!name || !img || !skills || !days || !timings) return;
  
    try {
     
      await addDoc(collection(db, "teachers"), {
        name,
        img,
        skills,
        days,
        timings,
        createdAt: new Date()
      });
  
      
      // setTeachers([...teachers, { name, img, skills, days, timings }]);
  
      
      setName("");
      setImg("");
      setSkills("");
      setDays("");
      setTimings("");
  
      console.log("✅ Teacher successfully added to Firestore!");
    } catch (error) {
      console.error("❌ Error adding teacher: ", error);
    }
  };
  




  const fetchTeachers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const teachersArray = [];
      querySnapshot.forEach((doc) => {
        console.log("👨‍🏫 Teacher:", { id: doc.id, ...doc.data() });
        teachersArray.push({ id: doc.id, ...doc.data() });
      });
      setTeachers(teachersArray); 
    } catch (error) {
      console.error("❌ Error fetching teachers:", error);
    }
  };
  

useEffect(()=>{
  fetchTeachers()
},[])






  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="md:ml-64 pt-20 px-8">
        
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer shadow-sm"
        >
          <FaArrowLeft size={16} />
          Back to Settings
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <FaUserPlus size={22} />
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-700">
              Add Teacher
            </h3>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Enter teacher name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Enter teacher image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Enter teacher skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Working Days (e.g. Mon-Fri)"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Timings (e.g. 9am - 3pm)"
              value={timings}
              onChange={(e) => setTimings(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={addTeacher}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              Add Teacher
            </button>
          </div>

          
          <div>
            <h4 className="text-sm text-gray-500 mb-3">Teachers List</h4>
            {teachers.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-lg text-gray-400 text-sm">
                No teachers added yet
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition"
                  >
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-white shadow mb-4"
                    />
                    <h5 className="font-semibold text-gray-700 text-lg">
                      {t.name}
                    </h5>
                    <p className="text-sm text-gray-500 mb-2">{t.skills}</p>

                    <div className="w-full mt-3 space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <FaCalendarAlt className="text-indigo-500" />
                        <span>{t.days}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <FaClock className="text-indigo-500" />
                        <span>{t.timings}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <FaBook className="text-indigo-500" />
                        <span>Instructor</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
