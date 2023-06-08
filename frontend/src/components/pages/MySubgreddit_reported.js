import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./MySubgreddit_reported.css"
import NavDash_for_subg  from "../NavDash_for_subg/NavDash_for_subg"
// import Home from "./Home"
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import MySubgreddit_reported_info from './MySubgreddit_reported_info';
import { color } from '@mui/system';
const MySubgreddit_reported = () => {
  const navigate = useNavigate()
  const handleKeyPress = useCallback((event) => {
    if(event.key === 'B')
      navigate('./..')
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
  const {id} = useParams();
  const get_url = "http://localhost:5000/api/get_reports";
  let [data,set_data]=useState([]);
  useEffect (() => {
    axios.post(get_url,{id : id}).then(
        res => {
            console.log("printing the res.data",res.data);
            if(res.data==="-1")
            {
              console.log("Report has expired it's over 10 days now :) ");
            }
            else
            set_data(res.data);
            
        }   
    )
},[])
const renderlists = [];

if(data!==undefined)
{
  for(let ele of data)
  {
    renderlists.push(
      <>
        <MySubgreddit_reported_info ele={ele}/>
      </>
    )
  }
}
  return (
    <>
    <NavDash_for_subg id={id}/>
    <div className="homeContainer">
        <Sidebar />
        {/* <Feed/> */}
        <div className="feed">
      <div className="feedWrapper">
      <div style={{textAlign:"center"}}><b>Reported Posts : </b></div>
        {renderlists}
      </div>
      </div>
        <Rightbar/>
      </div>
    </>
  )
}

export default MySubgreddit_reported
