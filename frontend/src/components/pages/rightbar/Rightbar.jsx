import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg"src="https://media2.giphy.com/media/cL4VwGyAEP76FQV4vs/giphy.gif?cid=6c09b952tymp78huz0hapoxgq8wekydw567dpvr2kq8ancxh&rid=giphy.gif&ct=s" alt="" />
          <span className="birthdayText">
            <b>Yash</b> and <b>3 other users</b> have recieved news bounty.
          </span>
        </div>
        <img className="rightbarAd" src="https://i.pinimg.com/originals/b9/7d/c2/b97dc288d71e7938c1ce8b7faacdc9ac.gif" alt="" />
        <h4 className="rightbarTitle">🟠Online Moderators</h4>
        <ul className="rightbarFriendList">
          <Online/> 
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
} 