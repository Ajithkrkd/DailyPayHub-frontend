import React from "react";
import LoginPage from "./Pages/loginPage";
import HomePage from "./Pages/HomePage";
import{BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import SignUpPage from "./Pages/SignUpPage";
import EditProfilePage from "./Pages/EditProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import UserRoutes from "./Components/PrivateRoutes/UserRoutes";

function App() {
  return (
   
     <div>
      <Router>
       <Routes>
        <Route element={<UserRoutes/>}>
          <Route path="/editProfile" Component={EditProfilePage}/>
          <Route path="/userProfile" Component={UserProfilePage}/>
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