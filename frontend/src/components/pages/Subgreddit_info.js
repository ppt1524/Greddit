import "./MySubgreddit_info.css";
import { MoreVert } from "@material-ui/icons";
import ReportIcon from '@mui/icons-material/Report';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import { WindowOutlined } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
export default function Post({Name,Banned,Description,Tags,_id,Owner,People,RequestedPeople,LeftPeople,Posts}) {
  console.log("printing the data received as props : ",Name,Banned,Description,Tags,_id,Owner,People,RequestedPeople,LeftPeople)
  const navigate = useNavigate();
  console.log("printing the arrays here : ",RequestedPeople,People);
    let profile_data = localStorage.getItem("contact");
    profile_data=JSON.parse(profile_data);
    // const navigate = useNavigate();
    function Delete_post(){
        const del_url = "http://localhost:5000/api/MySubgreddit_del";
        axios.post(del_url,{id : _id}).then(
            res => {
                console.log("printing the res.data",res.data);
                window.location.reload();
                // const nav = () => navigate('/MySubgreddit');
                // nav();
            }
            )
        // navigate('/MySubgreddit');
    }
    console.log(profile_data);
    console.log("comparing the moderators : ",Owner,profile_data.email)
    let ok = 0;
    if(Owner === profile_data.email)
    ok=1;
    for(let i=0;i<People.length ;i++)
    if(People[i]===profile_data.email)ok=2;
    for(let i=0;i<RequestedPeople.length ;i++)
    if(RequestedPeople[i]===profile_data.email)ok=3;
    for(let i=0;i<LeftPeople.length ;i++)
    if(LeftPeople[i]===profile_data.email)
    {
      // console.log("printing the tags : ",Tags);
      console.log("here in the left_peoplw")
      console.log(" printing the tags : printing the left people",LeftPeople[i],Tags);
      ok=4;
    }
    console.log(ok)
    function onbtnclick(event){
      event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
      console.log("printing the things on clickc : ",ok,Name,Banned,Description,Tags,_id,Owner,People,RequestedPeople,LeftPeople);
      console.log("checking ok here :{"+ok+"}")
      if(ok===0){
        console.log("here in ok =0",ok)
        const get_url = "http://localhost:5000/api/add_request";
          axios.post(get_url,{_id : _id , email : profile_data.email}).then(
              res => {
                  console.log("printing the res.data",res.data);
                  // store_of_my_subgreddits = res.data;
                  // set_data(res.data);
                  // console.log("Printing the store_of_subg : ",subgreddit_data);
                  window.location.reload();
              }
          )
        console.log("here in the button to send request")
      }
      else if(ok===4)window.alert("already left this subgreddit")
    }
    function onbtnleave(event){ // can be here only in the case 2 i.e. in the people array
      event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
      const get_url = "http://localhost:5000/api/leave";
          axios.post(get_url,{_id : _id , email : profile_data.email}).then(
              res => {
                  console.log("printing the res.data",res.data);
                  // store_of_my_subgreddits = res.data;
                  // set_data(res.data);
                  // console.log("Printing the store_of_subg : ",subgreddit_data);
                  window.location.reload();
              }
          )
    }
    function reportpost(){
      console.log("here in report post : ");
    }
    function enter_func(e){
//       e.cancelBubble = true;
// if(e.stopPropagation) e.stopPropagation();
      // e.stopPropagation();
      var nowDate = new Date(); 
      var cur_Date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
      const get_url = "http://localhost:5000/api/for_date_clicks";
          axios.post(get_url,{Subg_id : _id , Date : cur_Date}).then(
              res => {
                  console.log("printing the res.data",res.data);
                  // store_of_my_subgreddits = res.data;
                  // set_data(res.data);
                  // console.log("Printing the store_of_subg : ",subgreddit_data);
                  window.location.reload();
              }
          )
      navigate(`/Subgreddit/${_id}`);
    }
  return (
    <div className="post" onClick={enter_func}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <Link to="/Profile"> */}
              <img className="postProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5588664/media/41f1c6138e920c97c68158de7888ebb1.png?compress=1&resize=400x300&vertical=top" alt="" />
            {/* </Link> */}
            <span className="postUsername">{Owner}</span>
          </div>
          <div className="postTopRight">
          <MoreVert/>
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
            
            {(ok===0  || ok===4) && 
            <Button  onClick={(event)=>
              onbtnclick(event)
              } variant="contained" color="success" size="small">
              Join
            </Button>
          }
            {
              (ok===1 ||  Owner===profile_data.email)&& <Button variant="contained" disabled color="error">Leave</Button>
            }
            {
              (ok===2) && Owner!==profile_data.email && 
              <Button onClick={(event)=>{
                onbtnleave(event)
                }} variant="contained" color="error" size="small">
                Leave
              </Button>
            }
            {/* <button onClick={()=>{enter_func()}}>Enter</button> */}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Number of People : {People.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
