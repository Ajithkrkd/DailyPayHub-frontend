import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import "../Profile/Profile.css";
import { fetchUserDetails } from "./userUtils";

function UserProfile() {
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

  useEffect(() => {
    fetchUserDetails(setUserData, setProfilePic);
    console.log(userData, "from uyserlkjafhsdasd");
  }, []);

  const navigate = useNavigate();
  return (
    <div className="pt-5">
      <div className="row">
        <div className="col-md-3 left-div">
          <img
            className="p-2 profile-img"
           src={userData.profileImagePath && `http://localhost:9000${userData.profileImagePath}`}
          />
          <h4 className="name_text">{userData.firstName}</h4>
          <ul className="member_date">
            <li className="fas fa-calendar-alt"></li>
            <li>Member since</li>
            <li>May 2022</li>
          </ul>
          <ul className="followers">
            <li className="fas fa-users"></li>
            <li>
              <span>3 </span> followers <span>|</span>
            </li>
            <li>
              <span>0 </span> following
            </li>
          </ul>
          <p className="verified-text">user verified with</p>
          <ul className="connetion-icons">
            {/* <li ><FontAwesomeIcon icon={faGoogle}/></li> */}
            <li className="fa fa-envelope"></li>
          </ul>
          <button
            onClick={() => navigate("/editProfile")}
            className="btn btn-dark  edit-button"
          >
            <span className="fas fa-edit"></span>Edit Profile
          </button>
        </div>

        {/* profile right side  */}

        <div className="col d-flex flex-column align-items-center justify-content-center align-text-center">
          <img src="/src/assets/brain.png.avif" style={{ width: 300 }}></img>
          <h4 className="havent-listed-text">
            You haven't Start your Community Chat !!
          </h4>
          <h5 className="havent-listed-sub-text">
            Let go of what you don't use anymore
          </h5>
          <button className="btn btn-dark  sell-button ">
            Start Chat <FontAwesomeIcon icon={faTelegram} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
