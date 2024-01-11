import React, { useState } from "react";
import "../SignUpFolder/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    setErrors({ ...errors, [name]: "" });
    if (name === "firstName") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "First name cannot be empty",
        }));
      } else if (value.length < 7 || value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "First name must be between 7 and 15 characters",
        }));
      }
    }
    if (name === "lastName") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Last name cannot be empty",
        }));
      } else if (value.length < 2 || value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Last name must be between 2 and 15 characters",
        }));
      }
    } else if (name === "email") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Email cannot be empty",
        }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Enter a valid email address (example@gmail.com)",
        }));
      }
    }
      if (name === "phoneNumber") {
        if (!/^\d+$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Phone Number must only contain numbers",
          }));
        } else if (value.length !== 10) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Phone Number must be 10 digits",
          }));
        }
      
    } else if (name === "password") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: " password cannot be empty",
        }));
      } else if (value.length < 8 || value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "password must be between 8 and 15 characters",
        }));
      }
    }
    if (name === "confirmPassword") {
      if (value === formData.password) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      } else if (value != formData.confirmPassword) {
        console.log(formData.password, formData.confirmPassword);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Passwords do not match",
        }));
      }
    }

  };
  let isValid = true;
  const validateForm = () => {
    isValid = true;

    if (formData.firstName.trim() === "") {
      if (formData.lastName.length < 8 || formData.lastName.length > 15)
        isValid = false;
    }

    if (formData.lastName.trim() === "") {
      if (formData.lastName.length < 2 || formData.lastName.length > 8)
        isValid = false;
    }
    if (formData.phoneNumber.trim() === "") {
      isValid = false;
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      isValid = false;
    } else if (formData.phoneNumber.length !== 10) {
      isValid = false;
    }
    if (formData.email.trim() === "") {
      if (!/\S+@\S+\.\S+/.test(formData.email)) isValid = false;
    }

    if (formData.password.trim() === "") {
      if (
        formData.confirmPassword.length < 8 ||
        formData.confirmPassword.length > 15
      )
        isValid = false;
    }

    if (formData.confirmPassword.trim() === "") {
      if (formData.password !== formData.confirmPassword) isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) {
      console.log(errors, "hafsdji");

      return;
    }
    if (!validateForm()) {
      toast.error("form data is not completed");
      console.log(" hai");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/register",
        formData
      );
      if (response.status === 200) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error during registration:", error);
    }
  };

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
