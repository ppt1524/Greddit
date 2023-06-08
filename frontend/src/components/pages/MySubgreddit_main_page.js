import React from 'react'
import NavDash_for_subg from "../NavDash_for_subg/NavDash_for_subg"
// import Home from "./Home"
import Sidebar from "./sidebar_for_subgreddit/Sidebar_for_subgreddit";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import './MySubgreddit_main_page.css'
import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useEffect } from 'react';
const MySubgreddit_main_page = (props) => {
   const {id} = useParams()
   let profile_data = localStorage.getItem("contact");
   profile_data=JSON.parse(profile_data);
   const url = "http://localhost:5000/api/get_subg_data"
   useEffect(()=>{
    axios.post(url,{Subgreddit_id : id}).then(
      res => {
        if(res.data.Owner!==profile_data.email){
          // window.alert("You can't access other SubGreddits!!");
          window.location.href = "http://localhost:3000/"
        }
      }
    )
   },[])
   console.log("printing the id : ",id);
   const navigate = useNavigate();
  //  console.log("print")
  // handle what happens on key press
  const handleKeyPress = useCallback((event) => {
    if(event.key === 'U')
      navigate('./USERS')
    if(event.key === 'S')
      navigate('./STATS')
    if(event.key === 'R')
      navigate('./REPORTED')
    if(event.key === 'J')
      navigate('./JOIN')
    console.log(`Key pressed: ${event.key}`);
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <>
    <NavDash_for_subg id={id}/>
    <div className="homeContainer">
        <Sidebar id={id}/>
        <Feed/>
        <Rightbar/>
      </div>
    </>
  )
}

export default MySubgreddit_main_page
