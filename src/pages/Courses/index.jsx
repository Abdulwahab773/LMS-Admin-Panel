import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import firebase from "../../firebase";
import { addDoc, collection, deleteDoc,doc, onSnapshot,query,updateDoc} from "firebase/firestore";

export default function Courses() {
  const db = firebase.db;

  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseFees, setCourseFees] = useState("");
  const [courseImg, setCourseImg] = useState("");
  const [allCourses, setAllCourses] = useState([]);

 
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFees, setEditFees] = useState("");

  useEffect(() => {
    getallCourses();
  }, []);

  let getallCourses = () => {
    const q = query(collection(db, "courses"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const courses = [];
      querySnapshot.forEach((docSnap) => {
        courses.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      });
      setAllCourses(courses);
    });

    return unsubscribe;
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
    setCourseImg(uploadedImageURL.url);
  };

  let addNewCourse = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "courses"), {
        courseName,
        courseDesc,
        courseFees,
        courseImg,
      });

      setCourseName("");
      setCourseDesc("");
      setCourseFees("");
      setCourseImg("");
    } catch (error) {
      console.log(error);
    }
  };

  let deleteCourse = async (deleteId) => {
    try {
      let adminUid = localStorage.getItem("admin-LMS-UId");
      if (!adminUid) {
        console.error("User not logged in");
        return;
      }

      const docRef = doc(db, "courses", deleteId);
      await deleteDoc(docRef);

      console.log("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const docRef = doc(db, "courses", id);
      await updateDoc(docRef, {
        courseName: editName,
        courseFees: editFees,
      });
      console.log("Course updated successfully!");
      setEditingId(null); 
    } catch (error) {
      console.error("Error updating course: ", error);
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="md:ml-64 pt-20 px-8">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700">Manage Courses</h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow hover:opacity-90 cursor-pointer"
          >
            + Add Course
          </button>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((data) => (
            <div
              key={data.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={data.courseImg}
                alt={data.courseName}
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                {editingId === data.id ? (
                 
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <input
                      type="text"
                      value={editFees}
                      onChange={(e) => setEditFees(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(data.id)}
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {data.courseName}
                    </h3>
                    <p className="text-indigo-600 font-bold">
                      Rs.{data.courseFees}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          setEditingId(data.id);
                          setEditName(data.courseName);
                          setEditFees(data.courseFees);
                        }}
                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(data.id)}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg transform scale-95 animate-slideUp">
              
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
