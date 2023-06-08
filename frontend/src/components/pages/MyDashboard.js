import React from 'react'
import "./MyDashboard.css"
import NavDash from "../NavDash/NavDash"
// import Home from "./Home"
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import { useEffect } from 'react';
import { DotLoader  } from 'react-spinners';
const MyDashboard = () => {
  return (
    <>
    <NavDash/>
    <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  )
}

export default MyDashboard