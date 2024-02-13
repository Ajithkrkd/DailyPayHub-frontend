import React from "react";
import LoginPage from '../src/Pages/LoginPage.jsx';
import HomePage from '../src/Pages/HomePage.jsx';
import{BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import SignUpPage from "../src/Pages/SignUpPage.jsx";
import EditProfilePage from "../src/Pages/EditProfilePage.jsx";
import UserProfilePage from "../src/Pages/UserProfilePage.jsx";
import UserRoutes from "./Components/PrivateRoutes/UserRoutes.jsx";
import AdminRoutes from './Components/PrivateRoutes/AdminRoutes.jsx'
import AdminLoginPage from "../src/Pages/Admin/AdminLoginPage.jsx";
import AdminHomePage from "../src/Pages/Admin/AdminHomePage.jsx";
function App() {
  return (
   
     <div>
      <Router>
       <Routes>
        <Route element={<UserRoutes/>}>
          <Route path="/editProfile" Component={EditProfilePage}/>
          <Route path="/userProfile" Component={UserProfilePage}/>
        </Route>
        <Route element={<AdminRoutes/>}>
          <Route path="/admin/login" Component={AdminLoginPage}/>
          <Route path="/admin" Component={AdminHomePage}/>
        </Route>
       <Route path="/login"Component={LoginPage}/>
        <Route path="/" Component={HomePage}/>
        <Route path="/register" Component={SignUpPage}/>
       </Routes>
      </Router>   
     </div>
  );
}

export default App;
