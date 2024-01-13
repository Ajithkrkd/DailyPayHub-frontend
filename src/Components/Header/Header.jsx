import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SideBarFolder/SideBarScript";
import "../SideBarFolder/SideBar.css";
import "../Header/Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    joinDate :"",
    profileImagePath: "",
    password: "",
  });
  const [token , setToken] = useState(null);

  const navigate = useNavigate();



  useEffect(()=>{
    if(false)
    {
      fetchUserDetails(setUserData,setProfilePic)
    }
    const token = localStorage.getItem("accessToken")
    setToken(token)
  },[])

  // const handleLogout = () =>{
  //   try {
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //       toast.success('successfully logouted ..')

  //       } catch (error) {
  //         console.log(error,"ajith her")
  //       }
  // }



  return (
    <div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
      <div className=" d-flex header  ">
        <div className="col d-flex align-items-center ">
          {/* <i className="bx bx-menu btnx" style={{ fontSize: "27px" }}></i> */}
          <img
            src="/src/assets/workers.jpg"
            className="keep-img"
            rel="keep logo"
          />
          <h5 className="keep-text">DailyPayHub</h5>
        </div>
        <div className="d-flex align-items-center   ">
          <i className="bx bx-cog mx-2"></i>

          {
            token ?
            <img
            rel="profile picture" onClick={()=>{navigate('/userProfile')}}
            className="profile" src={userData.profileImagePath ? `http://localhost:9000${userData.profileImagePath} ` : "/src/assets/workers.jpg"}
            alt="profile"
          />
          :
          <button className="btn btn-outline-dark " onClick={()=>{navigate('/login')}}>Login as a professional</button>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;

{
  /* <div className="searchBar">
        <i className="bx bx-search searchIcon"></i>
        <input type="text"  placeholder="search"/>
        <i className="bx bx-x closeIcon"></i>
      </div> */
}
