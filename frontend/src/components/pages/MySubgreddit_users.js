import React from 'react'
import "./MySubgreddit_users.css"
import NavDash_for_subg  from "../NavDash_for_subg/NavDash_for_subg"

// import Home from "./Home"
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MySubgreddit_users = () => {
  const {id} = useParams()
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
  // console.log(id);
  var [subgreddit_data,set_data] = useState();
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
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderlists=[];
  const PeopleList=[]; 
  if(subgreddit_data !== undefined)
  {
  for (const ele of (subgreddit_data["BlockedPeople"]))
  {
    renderlists.push(<Paper elevation={5} style={{textAlign:"center"}}>{ele}</Paper>)
  }
  for (const ele of (subgreddit_data["People"]))
  {
    PeopleList.push(<Paper elevation={5} style={{textAlign:"center"}}>{ele}</Paper>)
  }
}


  return (
    <>
    <NavDash_for_subg id={id}/>
    <div className="homeContainer">
        <Sidebar />
        {/* <Feed/> */}
        {/* <div> */}
        <div className="feed">
      <div className="feedWrapper">
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Un-Blocked" {...a11yProps(0)} />
          <Tab label="Blocked" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} textAlign="center" justifyContent="center" alignItems="center">  
        {/* Un-Blocked */}
        {PeopleList}
      </TabPanel>
      <TabPanel value={value} index={1}>
       {renderlists}
      </TabPanel>
    </Box>
    </div>
    </div>
        <Rightbar/>
      </div>
    </>
  )
}

export default MySubgreddit_users
