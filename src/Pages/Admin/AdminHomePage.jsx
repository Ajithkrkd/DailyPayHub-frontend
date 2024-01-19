import React from 'react'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/SideBarFolder/SideBar'
import AdminDashBoard from '../../Components/Admin/AdminDashBoard'
function AdminHomePage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <AdminDashBoard/>
    </div>
  )
}

export default AdminHomePage