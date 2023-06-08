import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Register.css"
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { Navigate } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';
import { DotLoader  } from 'react-spinners';

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

const theme = createTheme();

export default function SignUp(props) {
  const [fname,setfname]=useState("")
  const [lname,setlname]=useState("")
  const [cur_age,setage]=useState("")
  const [cur_contact,setcontact]=useState("")
  const [cur_username,setusername]=useState("")
  const [cur_email,setemail]=useState("")
  const [cur_pass,setpassword]=useState("")
  const [isLoading,setIsLoading]=useState(false)

  function containsOnlyNumbers(str) {
    return /^(\d+,)*(\d+)$/.test(str);
  }
  function check(){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(fname.length && lname.length && cur_age.length && cur_contact.length===10 && cur_username.length && cur_email.length && cur_pass.length && re.test(cur_email) && containsOnlyNumbers(cur_age) && containsOnlyNumbers(cur_contact))return 1;
    return 0;
  }
  const url = "http://localhost:5000/api/register";
  const navigate = useNavigate();
  let val = localStorage.getItem("ok");
  console.log(val);
  if(val==="true")
  {
    return <Navigate to="../Profile"/>
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {email : data.get('email'), password:data.get('password'), age:data.get('Age'),firstName:data.get('firstName'),
    lastName : data.get('lastName'), ContactNumber : data.get('ContactNumber'), UserName : data.get('UserName')
   }
   console.log(user);
   if(user.email==="" || user.password==="" || user.age==="" || user.firstName==="" || user.lastName==="" || user.ContactNumber==="" || user.UserName==="")
   {
    window.alert("All feilds need to be filled")
   }
   else
   {
    setIsLoading(true);
    axios.post(url,{
      email : user.email,
      password : user.password,
      age : user.age ,
      firstName : user.firstName,
      lastName : user.lastName,
      ContactNumber : user.ContactNumber,
      UserName : user.UserName
    }).then(
      res => {
        console.log(res.data);
        if(res.data==="INVALID")
        {
          window.alert("Email is already taken")
          setIsLoading(false);
        }
        else
        {
          const run = ()=>props.onFormSwitch('login');  
          setIsLoading(false);
          run();
          const nav = () => navigate('/combined');
          nav();
        }
      }
      )
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  }
  };

  return (
    <div>
    <Navbar/>
    <div className='for-bg'>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {isLoading && <DotLoader/>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fname}
                  onChange={(e)=>setfname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lname}
                  onChange={(e)=>setlname(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="Age"
                  name="Age"
                  required
                  fullWidth
                  id="Age"
                  label="Age"
                  autoFocus
                  value={cur_age}
                  onChange={(e)=>setage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ContactNumber"
                  label="Contact Number"
                  name="ContactNumber"
                  autoComplete="family-name"
                  value={cur_contact}
                  onChange={(e)=>setcontact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="UserName"
                  label="User Name"
                  name="UserName"
                  autoComplete="User Name"
                  value={cur_username}
                  onChange={(e)=>setusername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={cur_email}
                  onChange={(e)=>setemail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={cur_pass}
                  onChange={(e)=>setpassword(e.target.value)}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!check()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button variant="contained" onClick={()=>props.onFormSwitch('login')}>Log In</Button>

             
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
    </div>
  );
}