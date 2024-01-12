import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SideBarFolder/SideBarScript";
import "../SideBarFolder/SideBar.css";
import '../Header/Header.css'
import { fetchUserDetails } from "../Profile/userUtils";
import toast from 'react-hot-toast'
function Header() {
  const [isDropdownOpen , setIsDropdown] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    joinDate :"",
    profileImagePath: "",
    password: "",
  });
  const [profilePic , setProfilePic] = useState(null);



  const handleDropdown =()=>{
    setIsDropdown(!isDropdownOpen);
  }


  useEffect(()=>{
    if(false)
    {
      fetchUserDetails(setUserData,setProfilePic)
    }
      
  },[])

  const handleLogout = () =>{
    try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.success('successfully logouted ..')
          
        } catch (error) {
          console.log(error,"ajith her")
        }
  }

  return (
    <div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
     <div className="d-flex header align-items-center ">
     <div className="" >
        <i className="bx bx-menu btnx" style={{ fontSize: '27px' }}></i>
      </div>
      <img src='/src/assets/brain.png.avif' className="keep-img" rel="keep logo"/>
      <h5 className="keep-text">DailyPayHub</h5>
      <div className="searchBar">
        <i className="bx bx-search searchIcon"></i>
        <input type="text"  placeholder="search"/>
        <i className="bx bx-x closeIcon"></i>
      </div>
      <div className=" d-flex align-items-center  last-section">
      <i className="bx bx-refresh"></i>
      <i className="bx bx-grid-alt"></i>

      <i className="bx bx-cog" onClick={handleDropdown}></i>
      
      <img rel="profile picture" className="profile" src={userData.profileImagePath ? `http://localhost:9000${userData.profileImagePath} ` : "/src/assets/workers.jpg"} alt="profile" />
     </div>
     </div>
     {isDropdownOpen && (
          <div className="dropdown-content">
            <p className="text-center " style={{cursor:"pointer" , }} onClick={handleLogout}>Logout</p>
          </div>
        )}
     
    </div>
  );
}

export default Header;
