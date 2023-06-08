import React from 'react'
import "./MySubgreddit_reported.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { click } from '@testing-library/user-event/dist/click';
import emailjs from '@emailjs/browser';
const MySubgreddit_reported_info = ({ele}) => {
    console.log("printing the props Here : ",ele);
let [disabled,setDisabled] = useState(false);
let [cancel,setCancel] = useState("no");
let [btn,setbtn] = useState("");
let initialSeconds = 0;
let [seconds, setSeconds ] =  useState(initialSeconds);
let [clicked , setclicked] =useState("");
const for_btn = "http://localhost:5000/api/submit_btn_data";
let ok=0,my_ok="another";
let [cur_id,set_id]=useState()
const sendEmail = (donethis) => {
  console.log("TO : ",ele.ReportedBy)
  emailjs.send('service_btlbfik', 'template_5lvyd4n',{user_name : "check",user_email : ele.ReportedBy,message : `The post that you reported is now ${donethis}`,subject:"In Response of your report : "},'2HDSvhEVbwZ_4eXft')
    .then((result) => {
        console.log("here printing the result : ",result.text);
    }, (error) => {
        console.log("here printing the error : ",error.text);
    });
};
function Blockfunc(id){
  
    set_id(id);
    console.log("printing the seconds here : ",seconds);
    if(seconds===0)
    {
    setclicked("clicked");
    setSeconds(3)
    ok=1;
    setCancel("post")
    }
    else
    {
      setclicked("");
      setSeconds(0);
      setCancel("yes");
    }
}
console.log("printing clicked set cancel : ",cancel);
if(cancel==="post" && seconds===0){
  sendEmail("Blocked")
  setbtn("block");
  setDisabled(true);
  const send_BlkEmail = () => {
    // console.log("TO : ",ele.Posted_by)
    emailjs.send('service_btlbfik', 'template_5lvyd4n',{user_name : "check",user_email : ele.ReportedWhom,message : `Your Post has been Blocked`,subject:"In regards of your post: "},'2HDSvhEVbwZ_4eXft')
      .then((result) => {
          console.log("here printing the result : ",result.text);
      }, (error) => {
          console.log("here printing the error : ",error.text);
      });
  };
  send_BlkEmail();
  axios.post(for_btn,{ButtonState : "block",_id : cur_id, Post_id : ele.Post_id,Posted_by : ele.ReportedWhom,Subgreddit_id : ele.Subg_id}).then(
    res => {
        console.log("printing the res.data",res.data);
    }   
    )
    setCancel("no");
    // window.location.reload();
}
else if(cancel ==="yes" && seconds===0){
  setCancel("no");
}
function deletefunc(id){
  const send_Del_Email = () => {
    // console.log("TO : ",ele.Posted_by)
    emailjs.send('service_btlbfik', 'template_5lvyd4n',{user_name : "check",user_email : ele.ReportedWhom,message : `Your Post has been Deleted`,subject:"In regards of your post: "},'2HDSvhEVbwZ_4eXft')
      .then((result) => {
          console.log("here printing the result : ",result.text);
      }, (error) => {
          console.log("here printing the error : ",error.text);
      });
  };
  send_Del_Email();
  setbtn("delete");
  sendEmail("Deleted")
  setDisabled(true);
    ok=2;
  axios.post(for_btn,{ButtonState : "delete",_id : id, Post_id : ele.Post_id, Posted_by : ele.ReportedWhom,Subgreddit_id : ele.Subg_id}).then(
    res => {
        console.log("printing the res.data",res.data);
    }   
  )
  // window.location.reload();
}
  // sendEmail("Deleted")
  const send_Ign_Email = () => {
    // console.log("TO : ",ele.Posted_by)
    window.alert("checking here")
    // window.alert(ele)
    console.log("Printing element : ",ele);
    emailjs.send('service_btlbfik', 'template_5lvyd4n',{user_name : "check",user_email : ele.ReportedWhom,message : `Your Post has been Ignored`,subject:"In regards of your post: "},'2HDSvhEVbwZ_4eXft')
      .then((result) => {
          console.log("here printing the result : ",result.text);
      }, (error) => {
          console.log("here printing the error : ",error.text);
      });
  };
  function ignorefunc(id){
    sendEmail("Ignored")
    send_Ign_Email();
    setbtn("ignore");
    setDisabled(true);
    
  // window.alert("here in ignore")   
  // sendEmail()
    ok=3;
  axios.post(for_btn,{ButtonState : "ignore",_id : id, Post_id : ele.Post_id, Posted_by : ele.ReportedWhom,Subgreddit_id : ele.Subg_id}).then(
    res => {
        console.log("printing the res.data",res.data);
    }   
  )
    // window.location.reload();
}
const get_btn = "http://localhost:5000/api/get_btn_data";
useEffect (() => {
  axios.post(get_btn,{_id : ele._id}).then(
      res => {
          console.log("printing the res.data",res.data);
          // store_of_my_subgreddits = res.data;
          if(res.data !=="")
          {
            setbtn(res.data);
            setDisabled(true);
          }
          // console.log("Printing the store_of_subg : ",subgreddit_data);
      }   
  )
},[])   
if(btn!==undefined){
    console.log("printing the btn here : ",btn);
    if(btn==="block")ok=1;
    else if(btn==="delete")ok=2;
    else if(btn==="ignore")ok=3;
}
let cur_date = new Date();
cur_date= cur_date.toString();
cur_date= Date.parse(cur_date);
let prev_date = Date.parse(ele.CreationDate);
let time_in_ms = cur_date - prev_date;
function diff_hours(time_in_ms) 
 {
  return Math.abs(Math.round(time_in_ms/ (60000*60)));
 }
 console.log("printing the time in minutes here : ",diff_hours(time_in_ms));
// if(diff_hours(time_in_ms)>=24*10)
//     deletefunc(ele._id);
console.log(ok);    
console.log(ele)

useEffect(()=>{
let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
    }, 1000)
    return ()=> {
        clearInterval(myInterval);
      };
});

// if(seconds===0 && clicked!=="")setclicked("");
  return (
    <>
    <div className="share" >
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5630845/media/e95768b82810699dfd54512ff570954a.png?compress=1&resize=400x300&vertical=top" alt="" />
          <div className="shareInput">Reported By : {ele.ReportedBy}</div>
        </div>
        <hr className="shareHr" />
        <div style={{marginLeft: "30px"}}>
              Reported : {ele.ReportedWhom}
              <br />
              Text : {ele.Text}
              <br />
              Concern : {ele.Concern}
              <br />
        </div>
        <form className="shareBottom" >
          
          <div className="shareOptions">
            <div className="shareOption">
              <Stack spacing={2} direction="row">

            <Button disabled={disabled} variant='outlined' size='small' onClick={()=>{Blockfunc(ele._id)}}>
                {ok===1 && clicked==="" &&"Blocked"}
                {ok!==1 && clicked==="" && "Block"}
                {clicked==="clicked" && "Cancel in "+seconds+"s"}
                {/* {ok===10 && <p>{seconds}</p>} */}
                </Button>
            <Button disabled={disabled} variant='outlined' size='small' onClick={()=>{deletefunc(ele._id)}}>
                {ok===2 && "Deleted"}
                {ok!==2 && "Delete"}
            </Button>
            <Button disabled={disabled} variant='outlined' size='small' onClick={()=>{ignorefunc(ele._id)}}>
                {ok===3 && "Ignored"}
                {ok!==3 && "Ignore"}
            </Button>
            </Stack>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default MySubgreddit_reported_info


