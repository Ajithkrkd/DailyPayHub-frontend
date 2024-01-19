import React from 'react'
import Header from '../../Components/Header/Header'
import AdminLogin from '../../Components/Admin/AdminLogin'
import SideBar from '../../Components/SideBarFolder/SideBar'
function AdminLoginPage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <AdminLogin/>
    </div>
  )
}

export default AdminLoginPage