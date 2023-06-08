import "./Posts.css";
import { MoreVert } from "@material-ui/icons";
import SaveIcon from '@mui/icons-material/Save';
import ReportIcon from '@mui/icons-material/Report';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from "react";
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import emailjs from '@emailjs/browser';
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import {  useRef } from "react";
const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // alignItems:'center',justifyContent:'center'
  width: '50%',
    maxWidth: '100vw',
    maxHeight: '50%',
    position: 'fixed',
    top: '50%',
    left: '20%',
    transform: 'translate(0, -50%)',
    overflowY: 'auto'
};
export default function Post({Text,Upvotes,Downvotes,Subgreddit_id,Posted_by,_id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    let profile_data = localStorage.getItem("contact");
    profile_data=JSON.parse(profile_data);
    const navigate = useNavigate();
    var [followers, updatefollowers] = useState([]);
    const get_url = "http://localhost:5000/api/get_user_info_by_email";
    
    useEffect (() => {
        axios.post(get_url,{email : Posted_by}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                updatefollowers(res.data);
                console.log("Printing the store_of_subg : ",followers);
            }   
        )
    },[])
    console.log(profile_data);
    function onfollow(){
        console.log("here in add_followers");
        const add_followers_url = "http://localhost:5000/api/add_followers";
        axios.post(add_followers_url,{Posted_by : Posted_by,my_email : profile_data.email}).then(
        res => {
            console.log("printing the res.data",res.data);
            window.location.reload();
        }
        )
    }
    function savefunc(){
      console.log("here in save post function");
      const save_post = "http://localhost:5000/api/save_post";
      axios.post(save_post,{_id : _id,my_email : profile_data.email}).then(
        res => {
            console.log("printing the res.data",res.data);
            if(res.data==="already saved")
            window.alert("already saved");
            // window.location.reload();
        }
        )
    }
    let ok = 0;
    if(followers!==undefined)
    {
      console.log("printing the followers array here : ",followers);
      for(let i=0; i<followers.length ; i++){
        if(followers[i]===profile_data.email)ok=1;
      }
    }
    const [upvotes,setupvotes]=useState(0);
    const [downvotes,setdownvotes]=useState(0);
    const [comments,setcomments]=useState([]);
    const get_up = "http://localhost:5000/api/get_upvotes";
    const get_down = "http://localhost:5000/api/get_downvotes";
    const get_comments = "http://localhost:5000/api/get_comments";
    useEffect (() => {
      axios.post(get_up,{_id : _id}).then(
          res => {
              console.log("printing the res.data",res.data);
              // store_of_my_subgreddits = res.data;
              setupvotes(res.data.len);
              console.log("Printing the store_of_subg : ",followers);
          }   
      )
  },[])
  useEffect (() => {
    axios.post(get_down,{_id : _id}).then(
        res => {
            console.log("printing the res.data",res.data);
            // store_of_my_subgreddits = res.data;
            setdownvotes(res.data.len);
            console.log("Printing the store_of_subg : ",followers);
        }   
    )
},[])
useEffect (() => {
  axios.post(get_comments,{_id : _id}).then(
      res => {
          console.log("printing the res.data",res.data);
          // store_of_my_subgreddits = res.data;
          setcomments(res.data);
          // console.log("Printing the store_of_subg : ",followers);
      }   
  )
  
},[])
console.log("printing the comments here : ",comments);
let renderlists = [];
if(comments !== undefined)
{
    for (let ele of comments){
      renderlists.push(
            <>
            <div className="share" >
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5630845/media/e95768b82810699dfd54512ff570954a.png?compress=1&resize=400x300&vertical=top" alt="" />
          <div className="shareInput">{ele.email}</div>
        </div>
        {/* <hr className="shareHr" /> */}
        <form className="shareBottom" >
          <div className="shareOptions">
            <div className="shareOption">
              Comment : {ele.data}
            </div>
          </div>
        </form>
      </div>
    </div>

            </>
            // <Posts Text={ele.Text} Upvotes={ele.Upvotes} Downvotes={ele.Downvotes} Subgreddit_id={ele.Subgreddit_id} Posted_by={ele.Posted_by} _id={ele._id}/>
        )
    }
  }
    function callupvotes(){
      const save_post = "http://localhost:5000/api/upvotes";
      axios.post(save_post,{_id : _id,email : profile_data.email}).then(
        res => {
            console.log("printing the res.data",res.data);
            if(res.data==="invalid")
            window.alert("already upvoted");
            else setupvotes(res.data.len);
            // window.location.reload();
        }
        )
    }
    function calldownvotes(){
      const save_post = "http://localhost:5000/api/downvotes";
      axios.post(save_post,{_id : _id,email : profile_data.email}).then(
        res => {
            console.log("printing the res.data",res.data);
            if(res.data==="invalid")
            window.alert("already downvoted");
            else setdownvotes(res.data.len);
            // window.location.reload();
        }
        )
    }
    console.log("printing the upvotes : ",upvotes);
    let [data,setData] = useState("");
    let [concern,setConcern] = useState("");
    function submitcomment(event){
      // event.preventDefault();
      const save_post = "http://localhost:5000/api/submitcomment";
      console.log(data);
      axios.post(save_post,{_id : _id,email : profile_data.email, data : data}).then(
        res => {
            console.log("printing the res.data",res.data);
        }
        )
        handleClose()
        window.location.reload();
    }
    console.log(data);
    function update(e) {
      console.log(data);
      setData(
         e.target.value
      )
    }
    function update_concern(e){
      console.log("printing the concern here",concern);
      setConcern(e.target.value);
    }
    function reportfunc(event){
      console.log("here in report function");
      setAnchorEl(event.currentTarget);

    }
    const sendEmail = () => {
      console.log("TO : ",Posted_by)
      emailjs.send('service_btlbfik', 'template_5lvyd4n',{user_name : "check",user_email : Posted_by,message : `You have been reported by ${profile_data.email}`,subject:"Your Post has been reported : "},'2HDSvhEVbwZ_4eXft')
        .then((result) => {
            console.log("here printing the result : ",result.text);
        }, (error) => {
            console.log("here printing the error : ",error.text);
        });
    };
    function sendreport(){

      sendEmail();

      console.log("printing the concern here in send report",concern);
      const save_post = "http://localhost:5000/api/report";
      const curDate = new Date();
      console.log("printing the type of cur_date : ",typeof(curDate),curDate);
      console.log(data);
      axios.post(save_post,{_id : _id,ReportedBy : profile_data.email,Concern : concern, CreationDate : curDate.toString()}).then(
        res => {
            console.log("printing the res.data",res.data);
        }
        )
        handleClose1();
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose1 = () => {
      setAnchorEl(null);
    };
  
    const open1 = Boolean(anchorEl);
    const id = open1 ? 'simple-popover' : undefined;
    console.log("here is my concern : ",concern);
    let [get_subg_data,set_subg_data]=useState();
    const get_subg = "http://localhost:5000/api/get_subg_data";
    useEffect (() => {
        axios.post(get_subg,{Subgreddit_id : Subgreddit_id}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_subg_data(res.data);
                // console.log("Printing the store_of_subg : ",post_data);
            }   
        )
    },[])
    let check_ok = 0; 
    if(get_subg_data!==undefined )
    {
      if(get_subg_data.BlockedPeople.includes(Posted_by)===true)
      check_ok=1;
    }
    let email = "prathampthakkar@gmail.com"
    let subject= "temp"
    let body = "temp";
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to="/Profile">
              <img className="postProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5588664/media/41f1c6138e920c97c68158de7888ebb1.png?compress=1&resize=400x300&vertical=top" alt="" />
            </Link>
         
            <span className="postUsername">
         
              {check_ok===0 && Posted_by}
              {check_ok===1 && "Blocked User"}
             
            {
              ok===0 &&  <Button size="small" variant="outlined" onClick={()=>{onfollow()}}>Follow</Button>
            }
            {
              ok===1 && <Button size="small" variant="outlined">Following</Button>
            }
      {/* <a href="mailto:prathampthakkar@gmail.com?subject='Hello'&body='ok'">Click to Send an Email</a> */}

            </span>
          </div>
          <div className="postTopRight">  
          <IconButton>
            <SaveIcon onClick={()=>{savefunc()}}/>
          </IconButton>
          <IconButton>
            <ReportIcon onClick={reportfunc}/>
            <Popover
        id={id}
        open={open1}
        anchorEl={anchorEl}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          Concern : <input type="text" className="for-input" onChange={update_concern}/>
          <Button size="small" onClick={sendreport}>submit</Button>
          {/* <button>submit</button> */}
        </Typography>
      </Popover>
          </IconButton>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{Text}</span>
          <br/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <IconButton>
                <ThumbUpAltRoundedIcon onClick={()=>{callupvotes()}}/>
            </IconButton>
            Upvotes :   {upvotes}
            <IconButton>
                <ThumbDownRoundedIcon onClick={()=>{calldownvotes()}}/>
            </IconButton>
            Downvotes : {downvotes}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
            <div>
      <Button onClick={handleOpen}>Comments</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{overflow:"scroll", display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments : 
          </Typography>
          <Divider/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Add Comment : <input onChange={update} type="text" className="for-input"/>
          </Typography>
          <Button size="small"  onClick={()=>{submitcomment()}}>Submit</Button>
          {renderlists}
        </Box>
      </Modal>
    </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
