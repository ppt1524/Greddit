import "./MySubgreddit_info.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Post({Name,Banned,Description,Tags,_id,Owner,People,cur_Date,Posts}) {
  console.log(cur_Date)
  let date =new Date(cur_Date)
  var day = date.getDate(); //Date of the month: 2 in our example
var month = date.getMonth() + 1; //Month of the Year: 0-based index, so 1 in our example
var year = date.getFullYear() //Year: 2013
    let profile_data = localStorage.getItem("contact");
    profile_data=JSON.parse(profile_data);
    const navigate = useNavigate();
    function Delete_post(){
        const del_url = "http://localhost:5000/api/MySubgreddit_del";
        axios.post(del_url,{id : _id}).then(
            res => {
                console.log("printing the res.data",res.data);
                const del_url_2 = "http://localhost:5000/api/MySubgreddit_del_2";
                axios.post(del_url_2,{posts : res.data}).then(
                  res => {
                      console.log("printing the res.data",res.data);
                      // window.location.reload();
                      // const nav = () => navigate('/MySubgreddit');
                      // nav();
                  }
                  )

                window.location.reload();
                // const nav = () => navigate('/MySubgreddit');
                // nav();
            }
            )

        // navigate('/MySubgreddit');
    }
    console.log(profile_data);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to="/Profile">
              <img className="postProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5588664/media/41f1c6138e920c97c68158de7888ebb1.png?compress=1&resize=400x300&vertical=top" alt="" />
            </Link>
            <span className="postUsername">{Owner}</span>
            <span className="postDate">{day}/{month}/{year}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Name : {Name}</span>
          <br/>
          <span className="postText">Description : {Description}</span>
          <br/>
          <span className="postText">Tags : {Tags}</span>
          <br/>
          <span className="postText">Banned : {Banned}</span>
          <br/>
        <span className="postText">Number of Posts : {Posts.length}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
           
            <IconButton onClick={()=>navigate(`/MySubgreddit/${_id}`)}>
                <OpenInNewIcon/>
            </IconButton>
            <IconButton onClick={Delete_post}>
                <DeleteForeverIcon/>
            </IconButton>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Number of People : {People.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
