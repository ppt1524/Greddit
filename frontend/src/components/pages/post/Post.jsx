import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to="/Profile">
              <img className="postProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5588664/media/41f1c6138e920c97c68158de7888ebb1.png?compress=1&resize=400x300&vertical=top" alt="" />
            </Link>
            <span className="postUsername">USER_NAME</span>
            <span className="postDate">DATE</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">(This shows the format of posting : )</span>
          <br />
          <span className="postText">This will contain the content of the post</span>
         
          <img className="postImg" src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" alt="" />
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">

            <img className="likeIcon" src="https://png.pngtree.com/png-vector/20190121/ourlarge/pngtree-vector-like-icon-png-image_332943.jpg" alt="" />
            <img
              className="likeIcon"
              
              src="data:image/png;base64,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"
             
              alt=""
            />
            <span className="postLikeCounter"> people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
