
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import firebase from "../../firebase";

const db = firebase.db;

export default function Applicants() {



  // let [dummyApplicants ,setDummyApplicants] = useState({})
  let [dummyApplicants, setDummyApplicants] = useState([]);

useEffect(()=>{

  
  const getApplicants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "applicants"));
      console.log("Total Applicants:", querySnapshot.size);
  
      const applicantsArray = [];
      querySnapshot.forEach((doc) => {
        applicantsArray.push({ id: doc.id, ...doc.data() });
      });
  
      setDummyApplicants(applicantsArray); 
    } catch (error) {
      console.error("Error getting applicants: ", error);
    }
  };
  
  
  
  
  
  
  getApplicants()
  
},[])










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
                  src={applicant.userImg}
                  alt={applicant.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {applicant.UsreName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Applied for {applicant.course}
                  </p>
                </div>
              </div>

             
              <div className="mt-6">
                <Link to={`/applicants/${applicant.useruid}`}>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow hover:opacity-90 cursor-pointer">
                  View Application
                </button>
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}
