import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import "../Profile/Profile.css";
import { fetchUserDetails } from "./userUtils";
import CompanyRegistration from "../Company/CompanyRegistration";
import AddVerificationDocs from "../Company/AddVerificationDocs";
import customAxios from '/src/store/AxiosConfig.js'
import { COMPANY_DETAILS_URL, COMPANY_EMAIL_CONFIRM_URL } from "../Company/companyUtils";
import toast from "react-hot-toast";
import AddCompanyAddress from "../Company/AddCompanyAddress";
function UserProfile() {

  const [userDetails , setUserDetails] = useState()
  const [companyDetails , setCompanyDetails] = useState({
    companyName :'',
    companyOwnerName:'',
    companyLogoUrl:'',
    companyId:'',
    companyEmailVerified:'',
    companyEmail:''
  })

  const [emailVerified , setEmailNotVerified] = useState(false);
  const [AddressForm , setAddressForm] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(token, "token");
  

  useEffect(()=>{
    getCompanyDetails();
    fetchUserDetails(setUserData, setProfilePic);
    console.log("h---------------------------------userProfile useEffect")
    if(token){
      setVerificationDoc(true);
      verifyCompanyEmail()
    }
  },[])

const getCompanyDetails = async ()=>{
  try {
    const storedData = localStorage.getItem("userData");
    const userData = JSON.parse(storedData);
    setUserDetails(userData);
    const response = await customAxios.get(`${COMPANY_DETAILS_URL}details/${userData.userId}` ,
    {
        headers: {
          "Content-Type": "application/json", // Correcting the header name
        },
      }
    );
    console.log(response ,"here is the response you can check");
    localStorage.setItem("companyDetails" ,JSON.stringify(response.data));
    setCompanyDetails(response.data);
  } catch (error) {
    console.log(error)
  }
}



  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    joinDate :"",
    profileImagePath: "",
    password: "",
  });

  
  //confirm email start-------------->
  
  const verifyCompanyEmail = async()=>{
    try {
      const response = await customAxios.post(`${COMPANY_EMAIL_CONFIRM_URL}/${token}`)
      console.log(response)
      
    } catch (error) {
      console.log(error)
      if(error.response.data.message == "Verification Failed")
      {
        toast.error("verification failed becuase you clicked wrong mail")
      }
    
    }
  }
  
  
  
  
  
  //confirm email end-------------->




  //date formating for user friendly
  const dateString = userData.joinDate;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const reformattedDate = day + " " + month + " " + year;
  //date formating for user friendly


  const [renderForm , setRenderForm] = useState(false);
  const [verificationDoc , setVerificationDoc] = useState(false);

  const renderCompanyRegistrationForm = () =>{
    const {companyEmailVerified} =companyDetails;
    console.log(companyEmailVerified , 'from ---------------    renderCompanyRegistrationForm')
    if(!companyEmailVerified){
      setEmailNotVerified(true);
      toast.error('email is not verified')
    }
    setRenderForm(true);
  }
 

  const navigate = useNavigate();
  return (
    <div className="pt-5">
      <div className="row">
        <div className="col-lg-3 col-sm-12 d-flex flex-column align-items-center justify-content-center align-text-center">
          <img
            className="p-2 profile-img"
           src={userData.profileImagePath ? `http://localhost:9000${userData.profileImagePath} ` : "/src/assets/workers.jpg"}
          />
          <h4 className="name_text">{userData.firstName}</h4>
          <ul className="member_date">
            <li className="fas fa-calendar-alt"></li>
            <li>Member since</li>
            <li>{reformattedDate}</li>
          </ul>
          {/* <ul className="followers">
            <li className="fas fa-users"></li>
            <li>
              <span>3 </span> followers <span>|</span>
            </li>
            <li>
              <span>0 </span> following
            </li>
          </ul>
          <p className="verified-text">user verified with</p> */}
          <ul className="connetion-icons">
            {/* <li ><FontAwesomeIcon icon={faGoogle}/></li> */}
            <li className="fa fa-envelope"></li>
          </ul>
          <button
            onClick={() => navigate("/editProfile")}
            className="btn btn-dark  edit-button w-100"
          >
            <span className="fas fa-edit"></span>Edit Profile
          </button>
          <button
            onClick={() => navigate("/editProfile")}
            className="btn btn-dark  edit-button w-100"
          >
            <span className="fas fa-edit"></span>Company Management
          </button>
        </div>
        <div className="col d-flex flex-column align-items-center justify-content-center align-text-center">
        {
          renderForm ? 
          (
          <>
          <CompanyRegistration props={{setAddressForm,setRenderForm}} />
          </>
          )
          : 
          emailVerified ?
          (
          <>
            <AddCompanyAddress />
          </>
          ) 
          :
          verificationDoc ?
          (
          <>
            <AddVerificationDocs />
          </>
          ) 
          :
          <>
          
          
        
          <img src="/src/assets/startJob.jpg" className="w-50 pt-3"></img>
          <h4 className="havent-listed-text">
            You haven't Start your First job !!
          </h4>
          <h5 className="havent-listed-sub-text">
            Let go of what you don't use anymore
          </h5>
          <button className="
              btn btn-dark  
              sell-button w-50"
              onClick={renderCompanyRegistrationForm}
              >

              Register Your company
               <FontAwesomeIcon icon={faTelegram} />
          </button>
          </>
        }
        </div>

        
      </div>
    </div>
  );
}

export default UserProfile;
