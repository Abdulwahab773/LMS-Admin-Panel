import React, { useState } from "react";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import  auth  from "../../firebase";
import Swal from "sweetalert2";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = () => {
    if (email === "adminwahab/ayan@gmail.com") {
      console.log("Email correct, continue login");

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem("admin-LMS-UId", userCredential.user.uid);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Write Correct Email & Password!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md animate__animated animate__fadeInDown ">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8 animate__animated animate__fadeInDown animate__delay-0.5s">
          LMS-Admin-Panel
        </h1>

        {/* Form */}
        <div className="space-y-6">
          {/* Email */}
          <div className="animate__animated animate__fadeInLeft animate__delay-0.5s">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="animate__animated animate__fadeInRight animate__delay-0.5s">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          {/* Login Button */}
          <div className="animate__animated animate__fadeInUp animate__delay-0.8s">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition cursor-pointer"
              onClick={loginAdmin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
