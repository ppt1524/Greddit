import React from 'react';
import './App.css';
// import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Saved_Post from "./pages/saved_post";
import react,{ useState } from 'react';
import MyDashboard from "./pages/MyDashboard"
import Logout from "./pages/Logout"
// import Update_data from "./Update_data"
import RequireAuth  from './pages/RequireAuth';
import MySubgreddit  from './pages/MySubgreddit';
import MySubgreddit_main_page  from './pages/MySubgreddit_main_page';
import Subgreddit_main_page  from './pages/Subgreddit_main_page';
import MySubgreddit_users  from './pages/MySubgreddit_users';
import MySubgreddit_join  from './pages/MySubgreddit_join';
import MySubgreddit_stats  from './pages/MySubgreddit_stats';
import MySubgreddit_reported from './pages/MySubgreddit_reported';
import Subgreddit from './pages/Subgreddit';

import { WindowSharp } from '@mui/icons-material';
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }  
  function showConfirm()
  {
    window.alert("NOOO")
    // window.prompt("Are you sure you want to leave")
  }
  return (
    <div className="container">
        <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/combined"  element={ 
              currentForm === 'login' ? 
              <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}/>
            <Route path="/MyDashboard" element={
              <RequireAuth>
            <MyDashboard/>
            </RequireAuth>
            } />
            <Route path="/Profile" element={
              <RequireAuth>
                <Profile/>
              </RequireAuth>
            } 
            onLeave={()=>showConfirm()}
            />
            <Route path="/saved_post" element={
              <RequireAuth>
                <Saved_Post/>
              </RequireAuth>
            } 
            />
            <Route path="/Logout" element={
              <RequireAuth>
              <Logout/>
              </RequireAuth>
            } />
            {/* <Route path='/Update_data' element={<RequireAuth><Update_data/></RequireAuth>}></Route> */}
            <Route path='/MySubgreddit' element={<RequireAuth><MySubgreddit/></RequireAuth>}></Route>
            <Route path='/MySubgreddit/:id' element={<RequireAuth><MySubgreddit_main_page/></RequireAuth>}></Route>
            <Route path='/MySubgreddit/:id/USERS' element={<RequireAuth><MySubgreddit_users/></RequireAuth>}></Route>
            <Route path='/MySubgreddit/:id/JOIN' element={<RequireAuth><MySubgreddit_join/></RequireAuth>}></Route>
            <Route path='/MySubgreddit/:id/STATS' element={<RequireAuth><MySubgreddit_stats/></RequireAuth>}></Route>
            <Route path='/MySubgreddit/:id/REPORTED' element={<RequireAuth><MySubgreddit_reported/></RequireAuth>}></Route>
            <Route path='/Subgreddit' element={<RequireAuth><Subgreddit/></RequireAuth>}></Route>
            <Route path='/Subgreddit/:id' element={<RequireAuth><Subgreddit_main_page/></RequireAuth>}></Route>
        </Routes>
    </div>
  );
}

export default App;
