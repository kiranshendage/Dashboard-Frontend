import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectionData = async () => {
    let response = await fetch("https://dashboard-backend-3-tvfv.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();
    console.warn(result);

    if (result) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));  
      navigate("/login"); 
    }
  };

  const isFormValid = name && email && password;
  return (
    <div className="main-signup">
      <div className="main-s">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter Full Name"
          className="input-box"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Enter Email"
          className="input-box"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="input-box"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="btn-1" onClick={collectionData} disabled={!isFormValid} >Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
