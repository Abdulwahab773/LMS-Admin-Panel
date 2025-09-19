import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useState } from "react";
import NavbarCmp from "../../components/navbar";

function ApplicantsPage() {
  const { uid } = useParams();

  let [dynamicData, setDynamicData] = useState({});
  let navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "applicants"),
          where("useruid", "==", uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log("Applicant Data:", doc.data());
            setDynamicData(doc.data());
          });
        } else {
          console.log("No applicant found with this useruid");
        }
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    if (uid) fetchData();
  }, [uid]);

  let enrolledStudent = async () => {
    try {
      let docRef = await addDoc(collection(db, "Enrolled"), {
        UserFatherName: dynamicData.UserFatherName,
        UserAddress: dynamicData.UserAddress,
        UserCity: dynamicData.UserCity,
        UserCNIC: dynamicData.UserCNIC,
        UserCountry: dynamicData.UserCountry,
        UserEmail: dynamicData.UserEmail,
        UserGender: dynamicData.UserGender,
        UserLastQualification: dynamicData.UserLastQualification,
        useruid: dynamicData.useruid,
        userName: dynamicData.UsreName,
        userCourse: dynamicData.userCourseSelect,
        userImg: dynamicData.userImg,
      });
      console.log(docRef);

      const q = query(
        collection(db, "applicants"),
        where("useruid", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        for (const document of querySnapshot.docs) {
          await deleteDoc(doc(db, "applicants", document.id));
          console.log("Applicant deleted with ID:", document.id);
          navigator("/admin");
        }
      } else {
        console.log("No applicant found with this useruid:", uid);
      }
    } catch (error) {
      console.error("Error moving applicant:", error);
    }
  };

  console.log("Dynamic Data:", dynamicData);

  return (
    <div className="min-h-screen bg-gray-950">
      <NavbarCmp />
      <h1 className="text-center text-2xl font-bold text-indigo-500 mt-8">
        This is an applicant page
      </h1>

      <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg p-6 text-white mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">
          Applicant Details
        </h2>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {dynamicData.UsreName}
          </p>
          <p>
            <span className="font-semibold">Father's Name:</span>{" "}
            {dynamicData.UserFatherName}
          </p>
          <p>
            <span className="font-semibold">course Name:</span>{" "}
            {dynamicData.userCourseSelect}
          </p>
          <p>
            <span className="font-semibold">CNIC:</span> {dynamicData.UserCNIC}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {dynamicData.UserAddress}
          </p>
          <p>
            <span className="font-semibold">City:</span> {dynamicData.UserCity}
          </p>
          <p>
            <span className="font-semibold">Country:</span>{" "}
            {dynamicData.UserCountry}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {dynamicData.UserEmail}
          </p>
          <p>
            <span className="font-semibold">Gender:</span>{" "}
            {dynamicData.UserGender}
          </p>
          <p>
            <span className="font-semibold">Qualification:</span>{" "}
            {dynamicData.UserLastQualification}
          </p>
          <p>
            <span className="font-semibold">User ID:</span>{" "}
            {dynamicData.useruid}
          </p>
        </div>

        <button
          onClick={enrolledStudent}
          className="mt-6 w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-700 transition"
        >
          Enroll
        </button>
      </div>
    </div>
  );
}

export default ApplicantsPage;
