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
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from "../Navbar/Navbar";
import { Navigate } from 'react-router-dom';
import axios from "axios"
import { DotLoader  } from 'react-spinners';
import { color } from '@mui/system';
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

export default function SignIn(props) {
  const navigate = useNavigate();
 
  let val = localStorage.getItem("ok");
  console.log(val); 
  console.log("here");
  if(val==="true")
  {
    let jwt = localStorage.getItem("access-token");
    if(jwt){
      // jwt = "a.b.c" // for checking if jwt works correctly
      console.log("printing the jwt here",jwt,typeof(jwt))
      axios.get("http://localhost:5000/api/auth",{
        headers: { authorization: `Bearer: ${jwt}` }
      }).then(
        res =>{
          console.log("came here ::::",typeof(res.data));
          console.log(JSON.stringify(res.data),typeof(JSON.stringify(res.data)),typeof(res.data));
          console.log(res.data);
          if(res.data==="INVALID_USER")
          {
            window.alert("LOL I detected you are invalid user");
            console.log("here in error");
            localStorage.removeItem("contact");
            localStorage.setItem("ok",false);
            const nav = () => navigate('/combined');
            nav();
          }
          else{
            console.log("CORRECT USER IS LOGGED IN");
            console.log("got corrrect password");
            const nav = () => navigate('/Mydashboard');
            nav();
            //  return <Navigate to="../Profile"/>
          }
      }
      ).catch(err => {
        console.log("got error");
        localStorage.removeItem("contact");
        localStorage.removeItem("ok");
        return <Navigate to="/combined"/>
      })
    }
    console.log("came here in val true sad");
    // return <Navigate to="../Profile"/>
  }
  
  const [isLoading,setIsLoading]=useState(false)
  const handleSubmit = (event) => {
    const url = "http://localhost:5000/api/login";
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user ={email : data.get('email'), password : data.get('password')};
    if(user.email==="" || user.password==="")
    {
      window.alert("All feilds need to be filled")
    }
    else
    {
      console.log(user);
      setIsLoading(true);    
      // window.alert(isLoading)
      axios.post(url,{
        email : user.email,
        password : user.password
      }).then(
        res => {
          console.log("ok came here");  
          console.log(res.data);
          if(res.data==="Unregistered")window.alert("You are unregistered register first!");
          else if(res.data.contacts === "Incorrect Password")
          {
            window.alert("Incorrect password");
            setIsLoading(false);    
          }
          else
          {
            // console.log("printing here");
            // console.log(res.data);
            // console.log("type of res.data.contacts",typeof(res.data.contacts));
            // console.log(JSON.stringify(res.data.contacts));
            // console.log(typeof(JSON.stringify(res.data.contacts)));
            localStorage.setItem("ok","true");
            localStorage.setItem("contact",JSON.stringify(res.data.contacts));
            // console.log("printing local storage --- ",localStorage.getItem("contact"));
            localStorage.setItem("access-token",res.data.token);
            let jwt = localStorage.getItem("access-token");
            if(jwt){
              // jwt = "a.b.c" // for checking if jwt works correctly
              console.log("printing the jwt here",jwt,typeof(jwt))
              axios.get("http://localhost:5000/api/auth",{
                headers: { authorization: `Bearer: ${jwt}` }
              }).then(
                res =>{
                  console.log("came here ::::",typeof(res.data));
                  console.log(JSON.stringify(res.data),typeof(JSON.stringify(res.data)),typeof(res.data));
                  console.log(res.data);
                  if(res.data==="INVALID_USER")
                  {
                    window.alert("LOL I detected you are invalid user");
                    console.log("here in error");
                    localStorage.removeItem("contact");
                    localStorage.setItem("ok",false);
                    const nav = () => navigate('/combined');
                    setIsLoading(false);
                    nav();
                  }
                  else{
                    console.log("CORRECT USER IS LOGGED IN");
                    const nav = () => navigate('/Mydashboard');
                    setIsLoading(false);
                    nav();
                    console.log("got corrrect password");
                  }
                }
              ).catch(err => {
                console.log("got error");
                localStorage.removeItem("contact");
                localStorage.removeItem("ok");
                setIsLoading(false);
                return <Navigate to="/combined"/>
              })  
            }
            setIsLoading(false);
          }
        }
      )
    }
    // else if(user.email==="admin" && user.password==="admin")
    // {
    //   localStorage.setItem("ok","true");
      
    //   const nav = () => navigate('/MyDashboard');
    //   nav();
    //   console.log("got admin");
    // }
    // else{
    //   console.log("not admin");
    //   const nav = () => navigate('/combined');
    //   nav();
    // }
  };
  const [cur_email , set_email]=useState("")
  const [pass , set_pass]=useState("")
  console.log(cur_email);
  console.log(pass);
  function check()
  {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(cur_email.length && pass.length && re.test(cur_email))return 1;
  }
  return (
    <>  
    {/* {window.alert(isLoading)} */}
       
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
          {isLoading && <DotLoader/>}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value = {cur_email}
              onChange={(e)=>set_email(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {pass}
              onChange={(e)=>set_pass(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!check()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              <Button variant="contained" onClick={()=>props.onFormSwitch('register')}>Don't have an account? Sign Up</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    {/* </div> */}
    </div>
    </div>
        
        </>
  );
}
