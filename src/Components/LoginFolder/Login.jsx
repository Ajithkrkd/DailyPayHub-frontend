import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../LoginFolder/Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notVerified, setNotVerified] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(token, "token");

  useEffect(() => {
    if(token){
      handleEmailVerification();
    }
  }, []);

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
        `http://localhost:9000/api/auth/authenticate`,
        {
          email,
          password,
        }
      );
      const { access_token, refresh_token } = response.data;
      console.log(
        "heerkjadjflokasdjasdfpasfpoasfdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
      );
      console.log("access        -----------", access_token);
      console.log("refresh        -----------", refresh_token);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate("/")
      console.log(response , 'here success message');
    } catch (error) {
      console.log("hai iam ajith");
      console.log(error.response);
      toast.error(error.response.data.message);
      if(error.response.data.status == 401)
      setNotVerified(true)
    }
  };

  const handleEmailVerification = async () => {
    const email = localStorage.getItem("email");

    try {
      console.log(email, "-------from here");
      const response = await axios.post(
        `http://localhost:9000/api/auth/confirm-email/${token}/${email}`
      );
      console.log(response);
      if (response.data.status === 200) {
        console.log("here success");
        setNotVerified(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(notVerified, "verification");
  return (
    <div className="mainDiv row d-flex">
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>

      <form className="col-6 login-form ">
        <h4 className="">Login</h4>
        <div>
          {notVerified && (
            <>
              <label className="btn btn-outline-danger">
                Your Email is not verified check mail
              </label>
            </>
          )}
        </div>
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
