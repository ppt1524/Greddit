import "./saved_info.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Post({id}) {
    let profile_data = localStorage.getItem("contact");
    profile_data=JSON.parse(profile_data);
    const navigate = useNavigate();
    function Delete_post(){
        
    }
    const [post_info,set_data]=useState([])
    const get_url = "http://localhost:5000/api/saved_post_info";
      
      useEffect (() => {
          axios.post(get_url,{_id : id}).then(
              res => {
                  console.log("printing the res.data",res.data);
                  // store_of_my_subgreddits = res.data;
                  set_data(res.data);
                  console.log("Printing the store_of_subg : ",post_info);
              }   
          )
      },[])
    console.log("printing the subg-data",post_info); 
    console.log(profile_data);
    function delete_post(){
        console.log("here in delete post")
        const del_url = "http://localhost:5000/api/del_saved_post";
        axios.post(del_url,{_id : id, email : profile_data.email}).then(
            res => {
                console.log("printing the res.data",res.data);
                window.location.reload();
                // store_of_my_subgreddits = res.data;
                // set_data(res.data);
                // console.log("Printing the store_of_subg : ",post_info);
            }   
        )
    }
    // console.log(post_info.Upvotes.length)
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to="/Profile">
              <img className="postProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5588664/media/41f1c6138e920c97c68158de7888ebb1.png?compress=1&resize=400x300&vertical=top" alt="" />
            </Link>
           
            <span className="postUsername">{post_info.Posted_by}</span>

          </div>
          <div className="postTopRight">
          <IconButton>
            <DeleteIcon onClick={()=>{delete_post()}}/>
          </IconButton>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Subgreddit Id of the post : {post_info.Subgreddit_id}</span>
          <br/>
          <span className="postText">{post_info.Text}</span>
          <br/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
           
            <IconButton onClick={()=>{window.location.href=`http://localhost:3000/Subgreddit/${post_info.Subgreddit_id}`}}>
                <ThumbUpAltRoundedIcon/>
            </IconButton>
            Upvotes :   {post_info.Upvotes!==undefined &&  post_info.Upvotes.length}
            {/* <IconButton onClick={Delete_post}> */}
            <IconButton onClick={()=>{window.location.href=`http://localhost:3000/Subgreddit/${post_info.Subgreddit_id}`}}>
                <ThumbDownRoundedIcon/>
            </IconButton>
            Downvotes : {post_info.Downvotes!==undefined &&  post_info.Downvotes.length}
      
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={()=>{window.location.href=`http://localhost:3000/Subgreddit/${post_info.Subgreddit_id}`}}>Comments</span>
            {/* <span className="postCommentText">{post.comment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
