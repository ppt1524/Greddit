import React from 'react'
import "./MySubgreddit_join.css"
import NavDash_for_subg  from "../NavDash_for_subg/NavDash_for_subg"
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
const MySubgreddit_join = () => {
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
  const {id} = useParams()
  var [subgreddit_data,set_data] = useState();
  function accept(ele){
    console.log("here in accept");
    console.log(ele);
    const accept_url = "http://localhost:5000/api/accept_user";
    axios.post(accept_url,{_id : id,ele : {ele},Time :  new Date().toLocaleString()}).then(
      res => {
          console.log("printing the res.data",res.data);
          window.location.reload();
      }
      )
  }
  function reject(ele){
    console.log("hrere in reject")
    console.log(ele)
    const del_url = "http://localhost:5000/api/reject_user";
        axios.post(del_url,{_id : {id},ele : {ele}}).then(
            res => {
                console.log("printing the res.data",res.data);
                window.location.reload();
            }
            )
  }
  const url = "http://localhost:5000/api/MySubgreddit_users"
  useEffect(()=>{
    axios.post(url,{_id : {id}}).then(
      res => {
        console.log("printing the res.data",res.data);
        // store_of_my_subgreddits = res.data;
        set_data(res.data);
      }   
      )
    },[])
    console.log("Printing the store_of_subg : ",subgreddit_data);
  const renderlists=[];
  if(subgreddit_data !== undefined)
  {
    
    for (const ele of (subgreddit_data["RequestedPeople"]))
    {
      renderlists.push(<><Paper elevation={5} style={{textAlign:"center"}}>{ele} 
            <IconButton onClick={() => accept(ele)}>
                <CheckCircleIcon/>
            </IconButton>
            <IconButton onClick={()=>reject(ele)}>
                <CancelIcon/>
            </IconButton>
      </Paper></>)
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
          <div style={{textAlign:"center"}}><b>List of People with Joining Requests : </b></div>
          {renderlists}
      </div>
      </div>
        <Rightbar/>
      </div>
    </>
  )
}

export default MySubgreddit_join
