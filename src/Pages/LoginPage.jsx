import React from 'react'
import Header from '../Components/Header/Header'
import Login from '../Components/LoginFolder/Login'
import SideBar from '../Components/SideBarFolder/SideBar'
function loginPage() {
  return (
    <div>
        <Header/>
        <SideBar/>
        <Login/>
    </div>
  )
}

export default loginPage