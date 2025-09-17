import {
  addDoc,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

function AdminPanel() {
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [applicantForms, setApplicantForms] = useState([]);
  // const [courseImg, setCourseImg] = useState("");
  let [enrolled , setEnrolled] = useState("")

  useEffect(() => {
    getApplicants();
    getenrolledStudent()
  }, []);

  const addCourse = async () => {
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        name: courseName,
        Description: courseDesc,
        Fees: coursePrice,
        Image: "Baad mai cloudinary sy add hongi....",
      });
      console.log("Document written with ID: ", docRef.id);
      setCourseName("");
      setCourseDesc("");
      setCoursePrice("");
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicants = () => {
    const q = query(collection(db, "applicants"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
        setApplicantForms(tempArr);
      });
    });
  };



  console.log(applicantForms);

  const getenrolledStudent = () => {
    const q = query(collection(db, "Enrolled"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
        setEnrolled(tempArr);
      });
    });
  };

console.log(enrolled);


  return (
    <>
      <h1 className="text-center font-semibold text-3xl mt-3">Admin Panel</h1>
      <div>
        <h1 className="font-semibold text-xl mt-5 mb-5">Add Course Section:</h1>

        <div className="flex flex-col gap-5 ">
          <input
            className="border p-1 w-68"
            placeholder="Enter Course Name"
            type="text"
            onChange={(e) => setCourseName(e.target.value)}
            value={courseName}
          />

          <input
            className="border p-1 w-68"
            placeholder="Enter Course description"
            type="text"
            onChange={(e) => setCourseDesc(e.target.value)}
            value={courseDesc}
          />
          <input
            className="border p-1 w-68"
            placeholder="Enter Course Price"
            type="number"
            onChange={(e) => setCoursePrice(e.target.value)}
            value={coursePrice}
          />

          <input className="border p-1 w-68" placeholder="Image" type="file" />

          <button
            onClick={addCourse}
            className="border p-2 w-36 ml-10 cursor-pointer bg-green-500 hover:bg-green-600 hover:text-white"
          >
            Add Course
          </button>
        </div>
      </div>

      <hr className="mt-3" />
      <div>
        <h1 className="font-semibold text-xl mt-5 mb-5">Enrolled Students:</h1>
        <select className="border">
          <option value="Course 1">Course 1</option>
          <option value="Course 2">Course 2</option>
          <option value="Course 3">Course 3</option>
        </select>

    
      </div>

      {enrolled.length > 0 ? (
  enrolled.map((userFor, i) => (
    <div key={i} className="border h-48 w-68 flex flex-col justify-center items-center gap-5">
      <img src={userFor.studentImg || "default-image.png"} alt="Student Image" />
      <h1>Student Name: {userFor.userName}</h1>
      <h1>Course Selected: {userFor.course}</h1>
      <Link to={`/admin/applicants/${userFor.useruid}`}>
        <h1 className="hover:underline cursor-pointer">Click to open dynamic page</h1>
      </Link>
    </div>
  ))
) : (
  <p>No enrolled students found.</p>
)}



      <hr className="mt-10" />

      <div>
        <h1 className="font-semibold text-xl mt-5 mb-5">Applicants:</h1>

        <div className="flex justify-center flex-wrap items-center gap-7">
          
          {applicantForms.map((userForm, i) => {
            return(
              <div  key={i} className="border h-48 w-68 flex flex-col justify-center items-center gap-5">
              <img src="fdc" alt="Student Image" />
              <h1>Student Name: {userForm.UsreName}</h1>
              <h1>Course Selected: {userForm.course}</h1>
             <Link to={`/admin/applicants/${userForm.useruid}`}>
              <h1 className="hover:underline cursor-pointer">Click to open dynamic page</h1>
             </Link>
            </div>
            )
            
          })}

          
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
