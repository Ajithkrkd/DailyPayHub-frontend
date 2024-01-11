import React from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const AdminRoute = () => {
    
    const token = localStorage.getItem('accessToken')
    
    console.log(token)
    const decoded = jwtDecode(token);
    const role = decoded.roles[0];
    console.log(role)

    return (
      <>
      {
        role === "ADMIN" ? <Outlet /> : <Navigate to="/login" />
      }
      </>
    );
  };

export default AdminRoute