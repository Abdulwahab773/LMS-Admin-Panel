import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <h1>This is login Page</h1>
      <input
      className="border-2"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Enter Your Email"
      />
      <br />
      <br />
      <input
      className="border-2"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Enter Your Password"
      />
      <br />
      <br />
      <button className="border-2" onClick={loginAdmin}>Login</button>
    </div>
  );
};

export default LoginPage;
