import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import NavDash from "../NavDash/NavDash"
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import "./MySubgreddit.css"
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
import MySubgreddit_info from "./MySubgreddit_info"
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
    const get_url = "http://localhost:5000/api/MySubgreddit_info";
    
    useEffect (() => {
        axios.post(get_url,{Owner : profile_data.email}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_data(res.data);
                console.log("Printing the store_of_subg : ",subgreddit_data);
            }   
        )
    },[])
    let Owner;
  const [selectedImage, setSelectedImage] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data,data.get('Tags'));
        let cur_date = new Date();
        cur_date = cur_date.toString();
        let image = {};

        if(selectedImage===null)
        image = ("https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2VhcmNofGVufDB8fDB8fA%3D%3D&w=1000&q=80");
        else{
            image= URL.createObjectURL(selectedImage);
        }
        console.log("for image : ",image,selectedImage,typeof(image),typeof(selectedImage));
        const store = {
            Name : data.get('Name'),
            Description : data.get('Description'),
            Tags : data.get('Tags'),
            Banned : data.get('Banned_Keywords'),
            Owner : profile_data.email,
            Date : cur_date,
            email : profile_data.email,
            Image : image
        }
        console.log("displaying the store : ",store)
        Owner = profile_data.email  
        console.log("printing the store and it's type : ",store,typeof(store));
        const url = "http://localhost:5000/api/MySubgreddit";
        axios.post(url,store).then(
            res => {
                console.log("ok so submitted my_sub_g information")
                console.log(res.data)
                axios.post(get_url,{Owner : profile_data.email}).then(
                 res => {
                    console.log("printing the res.data",res.data);
                    // store_of_my_subgreddits = res.data;
                    set_data(res.data);
                    console.log("Printing the store_of_subg : ",subgreddit_data);
                }
        )
                handleClose()
            }
            )
      };
      console.log("printing the subg-data",subgreddit_data); 
      
    //   const renderlists = subgreddit_data.map((item,val) => <div>{val}</div>)
    const renderlists=[];
    for (const ele of subgreddit_data){
        renderlists.push(
            <MySubgreddit_info Name={ele.Name} Banned={ele.Banned} Description={ele.Description} Tags={ele.Tags} _id={ele._id} Owner={ele.Owner} People={ele.People} cur_Date={ele.Date} Posts={ele.Posts}/>
        )
    }

    const theme = createTheme();
  console.log("here in mysubg");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
console.log('printing the owner : ',Owner,typeof(Owner));
    const [cur_name,setName] = useState("")
    const [cur_desc,setDesc] = useState("")
    const [cur_Banned,setBanned] = useState("")
    const [cur_Tags,setTags] = useState("")
    function check(){
        if(cur_Banned.length && cur_desc.length && cur_Tags.length && cur_name.length)return 1;
        return 0;
    }
    return (
        <>
        <NavDash/>
        <div className="homeContainer">
            <Sidebar />
            <div className="feed">
                <div className="feedWrapper">
                <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                            m: 1,
                            width:"100%",
                            height: 64,
                            },
                        }}
                        >
                        <Paper elevation={6} style={{textAlign:"center", fontSize:"large"}}>  
                            Create New Sub-Greddit : 
                            <br/>
                            <div>
                            <Button variant="outlined" color="success" size='small' onClick={handleOpen}>
                                 Create
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Fill the following details to make your own Sub-Greddit :
                                </Typography>
                                <Divider/>
                                <Typography id="modal-modal-description" sx={{ mt: 0.0 }}>
                                    <ThemeProvider theme={theme}>
                                    <Container component="main" maxWidth="xs">
                                        <CssBaseline />
                                        <Box
                                            sx={{
                                                marginTop: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                            <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Name"
                                            label="Name"
                                            name="Name"
                                            autoComplete="Name"
                                            autoFocus
                                            value={cur_name}
                                            onChange={(e)=>setName(e.target.value)}
                                            />
                                            <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="Description"
                                            label="Description"
                                            type="Description"
                                            id="Description"
                                            autoComplete="Description"
                                            value={cur_desc}
                                            onChange={(e)=>setDesc(e.target.value)}
                                            />
                                            <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="Banned_Keywords"
                                            label="Comma Seperated list of Banned Keywords"
                                            type="Banned_Keywords"
                                            id="Banned_Keywords"
                                            autoComplete="Banned Keywords"
                                            value={cur_Banned}
                                            onChange={(e)=>setBanned(e.target.value)}
                                            />
                                            <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="Tags"
                                            label="Tags"
                                            type="Tags"
                                            id="Tags"
                                            autoComplete="Tags"
                                            value={cur_Tags}
                                            onChange={(e)=>setTags(e.target.value)}
                                            />
                                            <input
                                            type="file"
                                            name="myImage"
                                            onChange={(event) => {
                                            console.log(event.target.files[0]);
                                            setSelectedImage(event.target.files[0]);
                                            }}
                                        />
                                            <Button
                                            type="submit"
                                            // onClick={handleClose}
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={!check()}
                                            >
                                            Create
                                            </Button>
                                        </Box>
                                        </Box>
                                        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                                    </Container>
                                    </ThemeProvider>
                                </Typography>
                                </Box>
                            </Modal>
                            </div>
                        </Paper>
                        </Box>   
                        {renderlists}
                </div>
            </div>
            <Rightbar/>
          </div>
        </>
  )
}

export default MySubgreddit
