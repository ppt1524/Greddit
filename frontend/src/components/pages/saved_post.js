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
// import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import Rightbar from "./rightbar/Rightbar";
import { useEffect, useState } from 'react';
import Saved_info from './Saved_info';
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
  const [saved_data,set_data]=useState([])
  const get_url = "http://localhost:5000/api/saved_info";
    
    useEffect (() => {
        axios.post(get_url,{email : profile_data.email}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_data(res.data);
                console.log("Printing the store_of_subg : ",saved_data);
            }   
        )
    },[])
  console.log("printing the subg-data",saved_data); 
  //   const renderlists = subgreddit_data.map((item,val) => <div>{val}</div>)

  const renderlists=[];
  for (const ele of saved_data){
      renderlists.push(
          <Saved_info  id={ele}/>
      )
  }
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
              {/* <span className="profileInfoDesc">Username : {profile_data.UserName}</span> */}
              {/* <h4 className="profileInfoName">{user.username}</h4> */}
              {/* <span className="profileInfoDesc">{user.desc}</span> */}
            </div>
            <div className='for-profile-form'>
            {/* <form onSubmit={handleSubmit}>
              <TextField
                required
                id="outlined-required"
                label="age"
                defaultValue={data.age}
                onChange={handleChange}
              />
        <br />
        <button type="submit">
          Update
        </button>
      </form> */}
              {/* First Name :{profile_data.firstName} */}
            </div>
          </div>
          <div className="profileRightBottom">
            {/* <Feed_Profile/> */}
            <div className="feed">
                 <div className="feedWrapper">
                 {renderlists}

                </div>
            </div>
            <Rightbar/>
            {/* <Feed username={username} />
            <Rightbar user={user} /> */}
          </div>
        </div>
      </div>
     
    </>
);
}
