import React ,{useEffect, useState} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const UserRoutes = ({}) => {
    const navigate = useNavigate(); 
    const [role , setRole] = useState(null)
    useEffect(()=>{
        fetchUserAuthority();
    },[])
   
    const fetchUserAuthority = async ()=>{
        const token = localStorage.getItem('accessToken')
        if(token === null){
            navigate('/')
        }
        const stringToken = JSON.stringify(token)
        console.log(token)
        const decoded = jwtDecode(stringToken);
        setRole(decoded.roles[0])
        console.log(role)
    }

    return (
      <>
      {
        role === "USER" ? <Outlet /> : <Navigate to="/login" />
      }
      </>
    );
  
};

export default UserRoutes;
