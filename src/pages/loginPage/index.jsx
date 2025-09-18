import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import NavbarCmp from "../../components/navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = () => {
    if (email === "adminwahab/ayan@gmail.com") {
      console.log("Email correct, continue login");
      
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("admin-LMS-UId" ,userCredential.user.uid)
        
        
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      alert("please admin Login ")
    }
  };


  return (
    <div  className="min-h-screen bg-gray-950">
      <NavbarCmp />


    



{/* <div className="min-h-screen flex items-center justify-center bg-gray-900"> */}
  {/* <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80"> */}
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
  <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80">
    <h1 className="text-2xl font-bold text-center text-white mb-6">
      Admin Login
    </h1>

    <input
      className="w-full p-3 mb-4 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      type="text"
      placeholder="Enter Your Email"
    />

    <input
      className="w-full p-3 mb-4 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      type="password"
      placeholder="Enter Your Password"
    />

    <button
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
      onClick={loginAdmin}
    >
      Login
    </button>
  </div>
</div>

    </div>
  );
};

export default LoginPage;
