import React, {  useState } from "react";
import { FaUserPlus, FaUniversity, FaRegCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/navbar";
import { addDoc, collection } from "firebase/firestore";
import firebase from "../../firebase";

export default function Settings() {
  const db = firebase.db;
let [accountHolderName, SetAccountHolderName] = useState("")
let [bankName ,setBankName] = useState("")
let [accountNumber ,setAccountNumber] =useState("")


let addbankDetails = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "bankDetails"), {
      accountHolderName,
      bankName,
      accountNumber,
    });

    // Reset fields
    SetAccountHolderName("");
    setBankName("");
    setAccountNumber("");

    console.log("Bank details added successfully!");
  } catch (error) {
    console.log("Error adding bank details:", error);
  }
};




  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="pt-20 md:ml-64 px-8">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-500 mb-8">
          Manage your teachers and bank details easily.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
          <div className="bg-white rounded-2xl shadow-lg p-8 border cursor-pointer transition flex flex-col items-center justify-center text-center group">
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4 group-hover:scale-110 transition">
              <FaUserPlus size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Teachers Section
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Add, manage and view all teachers here.
            </p>
            <Link to="/teachers">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition">
                Go to Teachers
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <FaUniversity size={22} />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-gray-700">
                Bank Details
              </h3>
            </div>

            <div className="space-y-4">
              <input
              onChange={(e)=>{
                SetAccountHolderName(e.target.value)
              }}
              value={accountHolderName}

                type="text"
                placeholder="Account Holder Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
              onChange={(e)=>{
                setBankName(e.target.value)
                              }}
                              value={bankName}
                type="text"
                placeholder="Bank Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
              onChange={(e)=>{
                setAccountNumber(e.target.value)
                              }}
                              value={accountNumber}
                type="text"
                placeholder="Account Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button onClick={addbankDetails} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer">
                <FaRegCreditCard /> Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
