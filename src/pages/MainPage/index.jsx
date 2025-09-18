// import {
//   addDoc,
//   collection,
//   onSnapshot,
//   query,
// } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { Link } from "react-router-dom";
// import NavbarCmp from "../../components/navbar";

// function AdminPanel() {
//   const [courseName, setCourseName] = useState("");
//   const [courseDesc, setCourseDesc] = useState("");
//   const [coursePrice, setCoursePrice] = useState("");
//   const [applicantForms, setApplicantForms] = useState([]);
//   const [courseImg, setCourseImg] = useState("");
//   let [loading ,setLoading] = useState(false)
//   let [enrolled , setEnrolled] = useState("")

//   useEffect(() => {
//     getApplicants();
//     getenrolledStudent()
//   }, []);

//   const addCourse = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "courses"), {
//         name: courseName,
//         Description: courseDesc,
//         Fees: coursePrice,
//         Image: courseImg,
//       });
//       console.log("Document written with ID: ", docRef.id);
//       setCourseName("");
//       setCourseDesc("");
//       setCoursePrice("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getApplicants = () => {
//     const q = query(collection(db, "applicants"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const tempArr = [];
//       querySnapshot.forEach((doc) => {
//         tempArr.push(doc.data());
//         setApplicantForms(tempArr);
//       });
//     });
//   };



//   console.log(applicantForms);

//   const getenrolledStudent = () => {
//     const q = query(collection(db, "Enrolled"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const tempArr = [];
//       querySnapshot.forEach((doc) => {
//         tempArr.push(doc.data());
//         setEnrolled(tempArr);
//       });
//     });
//   };

// console.log(enrolled);

// let handleFileUpload = async (e) => {
//   let file = e.target.files[0];
//   if (!file) return;
//   setLoading(true)

//   let data = new FormData();
//   data.append("file", file); 
//   data.append("upload_preset", "wahab-ayan-LMS"); 
//   data.append("cloud_name", "dw0yxu2o0"); 

//   let res = await fetch(
//     "https://api.cloudinary.com/v1_1/dw0yxu2o0/image/upload",
//     {
//       method: "POST",
//       body: data,
//     }
//   );

//   let uploadedImageURL = await res.json();
//   console.log("Uploaded Image URL:", uploadedImageURL.url);
//   setCourseImg(uploadedImageURL.url)
//   setLoading(false)
// };



//   return (
//     <>

// <div className="bg-gray-800">
// <NavbarCmp />


//       <div  >
       



      
// <div className="max-w-2xl mx-auto mt-10 bg-gray-900 shadow-lg rounded-xl p-6 space-y-6 mb-16">
//   <h2 className="text-2xl font-bold text-center text-white">Add New Course</h2>

  
//   <div>
//     <label
//       htmlFor="course-name"
//       className="block text-sm font-medium text-gray-300"
//     >
//       Course Name
//     </label>
//     <input
//       id="course-name"
//       className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       placeholder="Enter Course Name"
//       type="text"
//       onChange={(e) => setCourseName(e.target.value)}
//       value={courseName}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-300">
//       Course Description
//     </label>
//     <input
//       className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       placeholder="Enter Course Description"
//       type="text"
//       onChange={(e) => setCourseDesc(e.target.value)}
//       value={courseDesc}
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-300">
//       Course Price
//     </label>
//     <input
//       className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       placeholder="Enter Course Price"
//       type="number"
//       onChange={(e) => setCoursePrice(e.target.value)}
//       value={coursePrice}
//       />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-300">
//       Upload Image
//     </label>
//     {
//   loading ? (
//     <p className="text-center text-indigo-500 font-semibold">Uploading...</p>
//   ) : (
//     <input
//       className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
//       file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
//       file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
//       type="file"
//       onChange={handleFileUpload}
//     />
//   )
// }

   
//   </div>


//   <button
//     onClick={addCourse}
//     className="w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
//   >
//     Add Course
//   </button>
// </div>


//       </div>

//       <hr className="mt-3" />
//       <div className="bg-gray-800 min-h-screen p-6 rounded-md shadow-lg mb-16">
  
//   <h1 className="font-extrabold text-3xl text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//   Enrolled Students
// </h1>


//   {enrolled.length > 0 ? (
//     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {enrolled.map((userFor, i) => (
//         <div
//           key={i}
//           className="bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition"
//           >
          
//           <img
//             src={userFor.userImg || "default-image.png"}
//             alt="Student"
//             className="h-24 w-24 rounded-full object-cover border-2 border-indigo-500"
//             />

        
//           <h1 className="mt-3 text-lg font-semibold text-white">
//             {userFor.userName}
//           </h1>
//           <p className="text-sm text-gray-400">Course: {userFor.userCourse}</p>

          
//           <Link
//             to={`/admin/applicants/${userFor.useruid}`}
//             className="mt-3 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
//           >
//             View Details
//           </Link>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p className="text-center text-gray-400 mt-6">
//       No enrolled students found.
//     </p>
//   )}
//   </div>



    


//       <div className="font-extrabold text-3xl text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//   <h1 className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//     Applicants
//   </h1>

//   <div className="flex justify-center flex-wrap items-center gap-7">
//     {applicantForms.map((userForm, i) => (
//       <div
//         key={i}
//         className="bg-gray-900 rounded-xl shadow-lg p-5 w-72 flex flex-col items-center text-center hover:shadow-2xl transition"
//       >
      
//         <img
//           src={userForm.userImg || "default-image.png"}
//           alt="Student"
//           className="h-24 w-24 rounded-full object-cover border-2 border-indigo-500"
//         />

       
//         <h1 className="mt-3 text-lg font-semibold text-white">
//           {userForm.UsreName}
//         </h1>
//         <p className="text-sm text-gray-400">Course: {userForm.userCourseSelect}</p>

        
//         <Link
//           to={`/admin/applicants/${userForm.useruid}`}
//           className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
//         >
//           View Details
//         </Link>
//       </div>
//     ))}
//   </div>
// </div>


//           </div>
//     </>
//   );
// }

// export default AdminPanel;









// // ____________________________________________________________________________________________________ 


