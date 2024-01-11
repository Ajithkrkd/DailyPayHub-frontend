import React, { useState, useEffect } from "react";
import "../Profile/Profile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import customAxios from "/src/store/AxiosConfig.js";
import { handleInputValidation } from "./Validation";
import { validateForm } from "./Validation";
import { fetchUserDetails } from "./userUtils";
function EditProfile() {
  const navigate = useNavigate();
  const [showPassword1, setPassword1] = useState(false);
  const [showPassword2, setPassword2] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null)
  const [inputChanged , setInputChanged] = useState(false)
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImagePath: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserDetails(setFormData,setProfilePic);
  }, []);



  const handleInputChange = (e) => {
    setInputChanged(true)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //for setting the error message dynamically
    handleInputValidation(name, value, formData, errors, setErrors);
  };

  const updateUser = async () => {
    const isFormValid = validateForm({ formData ,errors});
    console.log(isFormValid)
    if (isFormValid && inputChanged) {
      const updatedUserFormData = { ...formData };
      delete updatedUserFormData.confirmPassword;
      try {
        const response = await customAxios.post(
          "/user/update-user",
          updatedUserFormData
        );
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      toast.error("Form validation failed. Please check the form for errors.");
    }
  };
  

  const imageUrl = selectedFile
  ? URL.createObjectURL(selectedFile)
  : profilePic;
  const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};


  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await customAxios.post(
        "/user/addProfilePic",
        formData,
        config
      );
      toast.success(response.data, "this is response");
      console.log("Profile picture uploaded:", response.data);
      fetchUserDetails();
    } catch (error) {
      console.log("Profile picture uploaded:", error.message);
    }
  };



  return (
    <div className="container-fluid parent-div">
      <div className="row d-flex mt-5">
        <div className="col-3">
          <p className="edit-profile-text">Edit Profile</p>
          <img src={profilePic ? `http://localhost:9000${profilePic}` : imageUrl}  className=" p-2 profile-img"/>
          <input
                type="file" 
                accept="image/*" 
                className=" my-4 form-control" 
                onChange={handleFileChange}
                />
          <p
            className="edit-profile-pic-text btn btn-primary"
            onClick={handleUpload}
          >
            update picture
          </p>
          <button
            className="edit-button btn btn-dark"
            onClick={() => {
              navigate("/userProfile");
            }}
          >
            <span></span> View Profile
          </button>
        </div>

        {/* right-side */}
        <div className="col d-flex edit-right-div flex-column">
          <div className="row  pt-4 edit-right-side-firstRow ">
            <h3 className="pb-3">Edit Profile</h3>
          </div>
          <div className="row edit-right-side-SecondRow d-flex mx-2 p-3">
            <div className="col">
              <div className="inputBox my-5 ">
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="firstname"
                  required="required"
                  name="firstName"
                  defaultValue={formData.firstName}
                />
                <span>firstname</span>
                {errors.firstName && (
                  <div className="" style={{ color: "red" }}>
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="inputBox">
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="lastname"
                  name="lastName"
                  required="required"
                  defaultValue={formData.lastName}
                />
                <span>lastname</span>
              </div>
              {errors.lastName && (
                <div className="" style={{ color: "red" }}>
                  {errors.lastName}
                </div>
              )}
            </div>
            <div className="col">
              <div className=" border why-its-importent-div">
                <ul className="">
                  <li className="d-flex">
                    <span>
                      <FontAwesomeIcon icon={faTelegram} />
                    </span>{" "}
                    <p className="mx-2 why-its-importent-text">
                      {" "}
                      Why is it important?
                    </p>
                  </li>
                  <li>
                    <p style={{ color: "#5C7A7D" }}>
                      "Welcome to your Employee Edit Profile page! Your profile
                      is a reflection of your professional identity within our
                      organization. To ensure accurate and meaningful
                      representation, please provide your full name, relevant
                      job details, Thank you for your attention to detail."
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="row right-side-third-row p-3">
            <h5 className="mb-5">Contact information</h5>
            <div className="col d-flex flex-column ">
              <div className="mb-3">
                <div className="inputBox">
                  <input
                    type="text"
                    id="phonenumber"
                    onChange={handleInputChange}
                    required="required"
                    name="phoneNumber"
                    defaultValue={formData.phoneNumber}
                  />
                  <span>phonenumber</span>
                </div>
                {errors.phoneNumber && (
                  <div className="" style={{ color: "red" }}>
                    {errors.phoneNumber}
                  </div>
                )}
              </div>

              <div className="inputBox">
                <input
                  type="text"
                  id="email"
                  onChange={handleInputChange}
                  required="required"
                  name="email"
                  readOnly
                  defaultValue={formData.email}
                />
                <span>email</span>
              </div>
              <div className="inputBox">
                <input
                  type={showPassword1 ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  required="required"
                />
                <span>password</span>
              </div>
              {errors.password && (
                <div className="" style={{ color: "red" }}>
                  {errors.password}
                </div>
              )}
              <div className="mb-4 show-password">
                <span
                  className=""
                  id="showPassword1"
                  onChange={handleInputChange}
                  onClick={() => setPassword1(!showPassword1)}
                >
                  Show password
                </span>
              </div>
            </div>
            <div className="col">
              <p style={{ color: "#5C7A7D" }}>Yay! Your number is verified.</p>
              <p style={{ color: "#5C7A7D" }}>
                Your email is never shared with external parties nor do we use
                it to spam you in any way.
              </p>
              <div className="inputBox">
                <input
                  type={showPassword2 ? "text" : "password"}
                  id="password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  required="required"
                />
                <span>confirm password</span>
              </div>
              {errors.confirmPassword && (
                <div className="" style={{ color: "red" }}>
                  {errors.confirmPassword}
                </div>
              )}
              <div className="mb-4 show-password">
                <span
                  className=""
                  id="showPassword1"
                  onClick={() => setPassword2(!showPassword2)}
                >
                  Show password
                </span>
              </div>
            </div>
          </div>

          <hr></hr>
          {/* <div className="row py-3">
            <div className="col right-side-div-forth-row">
              <ul>
                <li>
                  <h5>Additional information</h5>
                </li>
                <li>
                  <h7>Google</h7>
                </li>
                <li>
                  <p>
                    Link your Google account to seamlessly use your contact
                    list.
                  </p>
                </li>
              </ul>
            </div>
            <div className="col right-side-div-fifth-row d-flex justify-content-center align-items-center">
              <button className="unlink-button btn">
                <span></span>link
              </button>
            </div>
          </div> */}
          <hr></hr>
          <div className="row d-flex justify-content-center align-items-center p-3 ">
            <div className="col">
              {/* <h5 className="discard-text">Discard</h5> */}
            </div>
            <div className="col">
              <button className="saveChanged-button btn" onClick={updateUser}>
                <span></span>Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
