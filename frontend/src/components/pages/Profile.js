import React from 'react';
import "./Profile.css"
import "../NavDash/NavDash"
import NavDash from '../NavDash/NavDash';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import EditableTextField from "./EditableTextField";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import Feed_Profile from "./feed_profile/Feed";
import Rightbar_Profile from "./rightbar_profile/Rightbar";
function Item(props) {
  const { sx, ...other } = props;
  return (  
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
export default function PersonalProfile() {
  
  console.log("here in the profile")
  const navigate = useNavigate();
  // console.log(JSON.stringifylocalStorage.getItem("contact"));
  // console.log(localStorage.getItem("contact"));
  // profile_data = localStorage.getItem("contact");
  let profile_data = localStorage.getItem("contact");
  profile_data=JSON.parse(profile_data);
  console.log("printing profile_data in profile",profile_data)  
  console.log(profile_data["email"],typeof(profile_data));
  // let jwt = localStorage.getItem("access-token");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // if(jwt){
  //   jwt = "a.b.c"
  //   console.log("printing the jwt here",jwt,typeof(jwt))
  //   axios.get("http://localhost:5000/api/auth",{
  //     headers: { authorization: `Bearer: ${jwt}` }
  //   }).then(
  //     res =>{
  //       console.log("came here ::::",typeof(res.data));
  //       console.log(JSON.stringify(res.data),typeof(JSON.stringify(res.data)),typeof(res.data));
  //       console.log(res.data);
  //       if(res.data==="INVALID_USER")
  //       {
  //         window.alert("LOL I detected you are invalid user");
  //         console.log("here in error");
  //         localStorage.removeItem("contact");
  //         localStorage.setItem("ok",false);
  //         const nav = () => navigate('/combined');
  //         nav();
  //       }
  //       else{
  //         console.log("CORRECT USER IS LOGGED IN");
  //       }
  //     }
  //   ).catch(err => {
  //     console.log("got error");
  //     localStorage.removeItem("contact");
  //     localStorage.removeItem("ok");
  //     return <Navigate to="/combined"/>
  //   })
   // declare your data as initial state
 const [data, setData] = React.useState({
  email : profile_data.email,
  firstName : profile_data.firstName,
  lastName : profile_data.lastName,
  userName : profile_data.UserName,
  age : profile_data.age,
  ContactNumber : profile_data.ContactNumber
});

// handle on change according to input name and setState
const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault()
  // take data to submit
};
    return (
<>
      <NavDash />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src ="https://cdn.statusqueen.com/desktopwallpaper/thumbnail/beautiful-mountain-nature-colorful-295.jpg"
                alt="display_img"
              />
              <img
                className="profileUserImg"
                
                src="https://img.freepik.com/psd-premium/avatar-personaje-dibujos-animados-3d-aislado-renderizado-3d_235528-548.jpg?w=2000"
                alt="display_img"
              />
            </div>
            <div className="profileInfo">
              <h4>{profile_data.firstName} {profile_data.lastName}</h4>

            </div>
            <div className='for-profile-form'>
            
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed_Profile/>

            <Rightbar_Profile/>
          </div>
        </div>
      </div>
     
    </>
);
}
