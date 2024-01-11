import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../LoginFolder/Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
  
    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is not in the correct format");
      return;
    }
  
    if (password.trim() === "" || password.length < 8) {
      toast.error("Please enter a correct password (at least 8 characters)");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/authenticate",
        {
          email,
          password,
        }
      );
        console.log(response.data ,"ajith")
      const { access_token, refresh_token } = response.data;
      console.log("access        -----------",access_token)
      console.log("refresh        -----------",refresh_token )
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate('/')
      
    } catch (error) {
      // Handle errors
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };
  

  return (
    <div className="mainDiv row d-flex">
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
    
     <form className="col-6 login-form ">
        <h4 className="">Login</h4>
        <div className="form-group my-2">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-100 my-3"
          onClick={signIn}
        >
          Login
        </button>
      </form>
     </div>
    
  );
}

export default Login;
