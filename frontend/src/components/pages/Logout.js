import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavDash from '../NavDash/NavDash';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Logout.css"
const Logout = () => {
    const navigate = useNavigate();
    const func1 = () => {
        localStorage.setItem("ok","false");
        // event.preventDefault();
        console.log("here check check");
        const nav = () => navigate('/');
        console.log(localStorage.getItem("ok"))
        // if(localStorage.ok == false)
        nav();
    }
    const func2 = () => {
        // const navigate = useNavigate();
        const nav = () => navigate('/Profile');
        console.log(localStorage.getItem("ok"))
        // if(localStorage.ok == false)
        nav();
    }

  return (
    <>
    <NavDash/>
    <div className="for-mid">
       <h1 className='for-head'> Are you sure You want to Logout</h1>
    <Stack direction="row" spacing={2} className="for-btn">
      <Button variant="contained" color="error" onClick={func1}>
        Log Out
      </Button>
      <Button variant="contained" color="success" onClick={func2}>
        Go Back        
      </Button>
    </Stack>
    </div>
    </>
  )
}

export default Logout
