import React, { useState } from "react";
import "../SignUpFolder/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleInputValidation, validateForm } from "../Profile/Validation";

function SignUp() {
  //state ->  formdata for registration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  //state ->  Indicating the error
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  // when ever user try to make any changes in the input ,
  //i will handle the change here so also checking the validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //for setting the error
    handleInputValidation(name, value, formData, errors, setErrors)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm({ formData ,errors});
    
    if (!isFormValid) {
      toast.error("form data is not completed");
      console.log(" hai");
      return;
    }
    
    try {
      
      const response = await axios.post(
        "http://localhost:9000/api/auth/register",
        formData
      );
      if (response) {
        console.log(response)
        console.log("Registration successful");
        sentMailForVerification(e);
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error during registration:", error);
    }
  };


  
  const sentMailForVerification = async (e) =>{
    e.preventDefault();
    
    try {
      console.log(formData.email)
      const userEmail = formData.email;

      localStorage.setItem("email",userEmail)
      const response = await axios.post(`http://localhost:9000/api/auth/verify-email/${userEmail}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  
  }
  return (
    <div className="mainDiv row d-flex">
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
      <form className="col-6 ">
        <h4 className="form-header mb-2 ">Register</h4>

        <div class="form-group">
          <input
            type="email"
            className={`form-control my-2 ${
              errors.firstName ? "is-invalid" : ""
            }`}
            placeholder="first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        {errors.firstName && (
          <div className="" style={{ color: "red" }}>
            {errors.firstName}
          </div>
        )}

        <div class="form-group">
          <input
            type="lastName"
            className={`form-control my-2 ${
              errors.lastName ? "is-invalid" : ""
            }`}
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {errors.lastName && (
          <div className="" style={{ color: "red" }}>
            {errors.lastName}
          </div>
        )}
        <div class="form-group">
          <input
            type="phoneNumber"
            className={`form-control my-2 ${
              errors.phoneNumber ? "is-invalid" : ""
            }`}
            placeholder="phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {errors.phoneNumber && (
          <div className="" style={{ color: "red" }}>
            {errors.phoneNumber}
          </div>
        )}

        <div class="form-group">
          <input
            type="email"
            className={`form-control my-2 ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        {errors.email && (
          <div className="" style={{ color: "red" }}>
            {errors.email}
          </div>
        )}

        <div class="form-group">
          <div className="d-flex">
            <input
              type={`${showPassword == false ? "password" : "text"}`}
              className={`form-control my-2 ${
                errors.password ? "is-invalid" : ""
              }`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {showPassword ? (
              <i
                className="bx bxs-show mt-3 mx-2"
                onClick={() => {
                  setShowPassword(false);
                }}
                style={{ fontSize: "23px" }}
              />
            ) : (
              <i
                className="bx bx-low-vision mt-3 mx-2"
                onClick={() => {
                  setShowPassword(true);
                }}
                style={{ fontSize: "23px" }}
              />
            )}
          </div>
        </div>
        {errors.password && (
          <div className="" style={{ color: "red" }}>
            {errors.password}
          </div>
        )}

        <div class="form-group mt-2">
          <div className="d-flex">
            <input
              type={`${showConfirmPassword == false ? "password" : "text"}`}
              className={`form-control my-2 ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="confirmPassword"
            />
            {showConfirmPassword ? (
              <i
                className="bx bxs-show mt-3 mx-2"
                onClick={() => {
                  setShowConfirmPassword(false);
                }}
                style={{ fontSize: "23px" }}
              />
            ) : (
              <i
                className="bx bx-low-vision mt-3 mx-2"
                onClick={() => {
                  setShowConfirmPassword(true);
                }}
                style={{ fontSize: "23px" }}
              />
            )}
          </div>
        </div>
        {errors.confirmPassword && (
          <div className="" style={{ color: "red" }}>
            {errors.confirmPassword}
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className={`btn w-100 my-3 ${
            !!Object.values(errors).find((error) => error !== "")
              ? "btn-primary"
              : "btn-success"
          }`}
          disabled={!!Object.values(errors).find((error) => error !== "")}
        >
          Register
        </button>

        {/* <button 
            type="submit"
            class="btn btn-dark w-100"
            onClick={googleSighnup}
        >
            <i className="bx bxl-google mx-2" 
            style={{ color: "#fff" }} /> GOOGLE
        </button> */}
      </form>
    </div>
  );
}

export default SignUp;
