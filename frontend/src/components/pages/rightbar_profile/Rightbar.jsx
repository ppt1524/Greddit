import "./rightbar.css";
import React from "react";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { color } from "@mui/system";
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
export default function Rightbar_Profile({ user }) {
  let profile_data = localStorage.getItem("contact");
  profile_data=JSON.parse(profile_data);

  console.log("PRINTING THE PROFILE DATa", profile_data);
  let [data,setData] = useState('');
  console.log("displaying profile_data : ",profile_data);
  const url = "http://localhost:5000/api/updatedata";
  const navigate = useNavigate();
  
  console.log(profile_data,"here in rightbar");
  

  const ProfileRightbar = () => {
  let ok = -1;
    let [ischanged, setChange]=useState(false)    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
    const navigate = useNavigate();
    let profile_data = localStorage.getItem("contact");
    profile_data=JSON.parse(profile_data);
    let [data,setData] = useState(profile_data);
    function update(e) {
      ok=1;
      setChange(true);
      setData({
        ...data,
        [e.target.name] : e.target.value
      })
    }
    function submit(event){
      event.preventDefault();
      const url = "http://localhost:5000/api/update";
      console.log("sending this data to the backend in update",data);
      axios.post(url,
        data
      ).then(
        res => {
          if(res.data === "INVALID")window.alert("UPDATE UNSUCESSFULL");
          else 
          {
            console.log("this is the data and it's types :",data,typeof(data));
            localStorage.setItem("contact",JSON.stringify(data));
            const nav = () => navigate('/Profile');
            nav();
          }
        }
      )
      console.log(data);
      setChange(false);
    }

    const [user_info,update_user_info] = useState()
    useEffect(()=>{
      const url = "http://localhost:5000/api/get_user_info";
      axios.post(url,{_id : profile_data["_id"]}).then(
        res => {
          update_user_info(res.data);
        }
      )

    },[])
    function containsOnlyNumbers(str) {
      return /^(\d+,)*(\d+)$/.test(str);
    }
    function check(){
      console.log("checking : ",containsOnlyNumbers(data.age));
      if(data.UserName.length===0 || data.firstName.length===0 || data.lastName.length===0 || data.ContactNumber.length!==10 || data.age.length===0 || containsOnlyNumbers(data.age)===false || containsOnlyNumbers(data.ContactNumber)===false)return 0;
      return 1;
    }
    let followers_list = []
    let following_list = []
  function delete_followers(ele){
    console.log("here in delete_followers");
    console.log(ele);
    const delete_followers_url = "http://localhost:5000/api/delete_followers";
    axios.post(delete_followers_url,{_id : profile_data["_id"],ele : {ele}, email : profile_data["email"]}).then(
      res => {
          console.log("printing the res.data",res.data);
          window.location.reload();
      }
      )
  } 
  function delete_following(ele){
    console.log("here in delete_following");
    console.log(ele);
    const delete_following_url = "http://localhost:5000/api/delete_following";
    axios.post(delete_following_url,{_id : profile_data["_id"],ele : {ele},email :profile_data["email"]}).then(
      res => {
          console.log("printing the res.data",res.data);
          window.location.reload();
      }
      )
  }
  let cnt_followers = 0
  let cnt_followings = 0
  if(user_info !== undefined)
  {
  for (const ele of (user_info["Followers"]))
  {
    cnt_followers ++ ;
    followers_list.push(
      <>
      <MenuItem >
      {ele}
      <IconButton aria-label="delete" onClick={()=>delete_followers(ele)}>
        <DeleteIcon/>
      </IconButton>
    </MenuItem>
      </>
    )
  }
}
if(user_info!==undefined)
{
  for (const ele of (user_info["Following"]))
  {
    cnt_followings ++ ;
    following_list.push(
      <>
      <MenuItem >
      {ele}
      <IconButton aria-label="delete" onClick={()=>delete_following(ele)}>
        <DeleteIcon/>
      </IconButton>
    </MenuItem>
      </>
    )
  }
}

    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              UserName : <input placeholder="UserName" name="UserName" type="text" value={data.UserName} onChange={update}  />
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              firstName : <input placeholder="firstName" name="firstName" type="text" value={data.firstName} onChange={update}  />
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              lastName : <input placeholder="lastName" name="lastName" type="text" value={data.lastName} onChange={update}  />
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              ContactNumber : <input placeholder="ContactNumber" name="ContactNumber" type="text" value={data.ContactNumber} onChange={update}  />
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              Age : <input placeholder="Age" name="age" type="text" value={data.age} onChange={update}  />
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              Email : <input placeholder="email" name="email" type="text" value={data.email}  />
            </span>
          </div>
          <div className="rightbarInfoItem">  
            <span className="rightbarInfoKey">
            
      <Button
            variant="outlined"

        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Followers : {cnt_followers}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {followers_list}
        
      </Menu>

            
      <Button
            variant="outlined"

        id="demo-positioned-button"
        aria-controls={open1 ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick1}
      >
        Following - {cnt_followings}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left', 
        }}
      >
        {following_list}
      </Menu>
    </span>
    </div>
    
        
          <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={submit} disabled={!check()}>Update</Button>

          <Button variant="contained" onClick={()=>{navigate('../saved_post')}}>Saved Posts</Button>
          </Stack>
        </div>
        
      </>
    );
  };
  return (
    <>
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
      </div>
    </div>
      </>
  );
} 
