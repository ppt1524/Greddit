import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import NavDash from "../NavDash_without_search/NavDash_without_search"
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import "./Subgreddit.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { fontSize } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MySubgreddit_info from "./Subgreddit_info"
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import Fuse from "fuse.js";
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const MySubgreddit = () => {
  
let profile_data = localStorage.getItem("contact");
profile_data=JSON.parse(profile_data);
    var [subgreddit_data,set_data] = useState([]);
//   let display_info = []
    const navigate = useNavigate();
    // let store_of_my_subgreddits = [];
    const get_url = "http://localhost:5000/api/Subgreddit_info";
    
    useEffect (() => {
        axios.post(get_url).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_data(res.data);
                console.log("Printing the store_of_subg : ",subgreddit_data);
            }
        )
    },[])
   
  const [searchTerm, setSearchTerm] = useState("");
  const [fuseTerm, setfuseTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [applyfilterTerm, applysetFilterTerm] = useState("");
  const [sortState, setSortState] = useState("none");
  const sortMethods = {
    none: { method: (a, b) => ((a.Owner ===  profile_data.email || a.People.includes(profile_data.email))? -1 : 1) },
    ascending_name: { method: (a, b) => (a.Name < b.Name ? -1 : 1) },
    descending_name: { method: (a, b) => (a.Name > b.Name ? -1 : 1) },
    descending_followers: { method: (a, b) => (a.People.length > b.People.length ? -1 : 1) },
    ascending_date: { method: (a, b) => (Date.parse(a.Date) > Date.parse(b.Date) ? -1 : 1) },
  };
    let Owner;
    // function call_func(id){
    //   console.log("hre in call func")
    //   const url = "/MySubgreddit/"+`${id}`;
    //   window.location.href = url ;
    // }
      console.log("printing the subg-data",subgreddit_data); 
    //   const renderlists = subgreddit_data.map((item,val) => <div>{val}</div>)
    let renderlists=[];
    // const fuse = new Fuse(subgreddit_data, {
    //   keys: ["Name"]
    // });
    if(fuseTerm==="")
    {
    renderlists = subgreddit_data.sort(sortMethods[sortState].method).filter((ele) =>{
      const tags_array  = ele.Tags.split(", ")
      const input_tags = applyfilterTerm.split(", ")
      console.log("printing the tags array :",tags_array,input_tags);
        if(searchTerm==""){
          // if(filterTerm==="")return ele
          if(applyfilterTerm==="")
          { 
            return ele;
          }
          let ok =1;
          for(let j=0 ; j<input_tags.length ; j++)
          {
            let temp_ok = 0;
            for(let i = 0 ; i<tags_array.length ; i++)
            {
              console.log("printing the items of tag_aray",tags_array[i])
              if(input_tags[j]===tags_array[i])
                temp_ok=1;
            }
            if(temp_ok==0)ok=0;
          }
          if(ok==1)
          {
            return ele
          }
        }
        else if(ele.Name.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            return ele;
        }
    }).map ((ele) => (
      <div  style={{cursor : "pointer"}}>
        {console.log("printing in the map",ele)}
        {/* onClick={()=>{call_func(ele._id)}} style={{cursor:"pointer"}} */}
        {/* onClick={()=>navigate(`/MySubgreddit/${ele._id}`)} style={{cursor:"pointer"}} */}
       
        <MySubgreddit_info  Name={ele.Name} Banned={ele.Banned} Description={ele.Description} Tags={ele.Tags} _id={ele._id} Owner={ele.Owner} People={ele.People} RequestedPeople={ele.RequestedPeople} LeftPeople={ele.LeftPeople} Posts={ele.Posts} />
      </div>
    ))
    }
    if(fuseTerm!==""){
      const fuse = new Fuse(subgreddit_data, { 
        keys: ["Name"]    
    });   
      console.log("printing the subgreddit data : ",subgreddit_data);
      console.log("printing the fuse term : ",fuse.search(fuseTerm));
      let cur_data_fuse = fuse.search(fuseTerm);
      for( const ele of cur_data_fuse){
        renderlists.push(
          <div  style={{cursor : "pointer"}}>
        {/* {console.log("printing in the map",ele)} */}  
        {/* onClick={()=>{call_func(ele._id)}} style={{cursor:"pointer"}} */}
        {/* onClick={()=>navigate(`/MySubgreddit/${ele._id}`)} style={{cursor:"pointer"}} */}
       
        <MySubgreddit_info  Name={ele.item.Name} Banned={ele.item.Banned} Description={ele.item.Description} Tags={ele.item.Tags} _id={ele.item._id} Owner={ele.item.Owner} People={ele.item.People} RequestedPeople={ele.item.RequestedPeople} LeftPeople={ele.item.LeftPeople} Posts={ele.item.Posts} />
      </div>
        )
      }
    }
    // }
    // for (const ele of subgreddit_data){
    //     renderlists.push(
    //         <MySubgreddit_info Name={ele.Name} Banned={ele.Banned} Description={ele.Description} Tags={ele.Tags} _id={ele._id} Owner={ele.Owner} />
    //     )
    // }
        
    const theme = createTheme();
  console.log("here in mysubg");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
console.log('printing the owner : ',Owner,typeof(Owner));
    return (
        <>
        <NavDash/>
        <div className="homeContainer">
            
            <Sidebar />
            <div className="feed">
                <div className="feedWrapper">
                

                <div >
        {/* Search :  */}
        <div className="searchbar-here">
          <Search className="searchIcon-here" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput-here"
            onChange={(event) => {
                setSearchTerm(event.target.value)
            }}
          />
        </div>
        {/* <br></br> */}
        Fuzzy-Search :
        <div className="searchbar-here">
          <Search className="searchIcon-here" />
          <input
            placeholder="for-fuzzy-search"
            className="searchInput-here"
            onChange={(event) => {
                setfuseTerm(event.target.value)
            }}
          />
        </div>
      </div>
      <span>
        Apply Tags : 
      <input
            // placeholder="Search for friend, post or video"
            // className="searchInput-here"
            onChange={(event) => {
                setFilterTerm(event.target.value)
            }}
            
          />
        <button onClick={()=>{
          applysetFilterTerm(filterTerm)
        }}>Submit</button>
        </span>
          <br />
      <span>
        Sort on the basis of : 
      {/* <button onClick={() => sort_name()}>sort_name</button> */}
      <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
        <option value="DEFAULT" disabled>None</option>
        <option value="ascending_name">Ascending by Name</option>
        <option value="descending_name">Descending by Name</option>
        <option value="descending_followers">Descending by Followers</option>
        <option value="ascending_date">By Date</option>
      </select>
      </span>
      {/* <input type="submit" value="Submit"/> */}

      {console.log("printing the lists : ",renderlists)}
            {renderlists}
                </div>  
            </div>
            <Rightbar/>
          </div>
        </>
  )
}

export default MySubgreddit
