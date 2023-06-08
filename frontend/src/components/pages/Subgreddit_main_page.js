import React, { useState, CSSProperties } from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import NavDash from "../NavDash/NavDash"
import Sidebar from "./sidebar_for_subgreddit/Sidebar_for_subgreddit";
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
import Posts from "./Posts"
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { FadeLoader  } from 'react-spinners';
import { Fade } from 'react-bootstrap';
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
//   const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };
const MySubgreddit = () => {
   const {id} = useParams()
    console.log("printing the id of the subg : ",id);
let profile_data = localStorage.getItem("contact");
profile_data=JSON.parse(profile_data);
    // var [subgreddit_data,set_data] = useState([]);
    var [post_data,set_data] = useState([]);
    var [banned_words,set_ban] = useState([]);
//   let display_info = []
    const navigate = useNavigate();
    // let store_of_my_subgreddits = [];
    const get_url = "http://localhost:5000/api/post_info";
    console.log(id);
    useEffect (() => {
        axios.post(get_url,{Posted_by : profile_data.email,Subgreddit_id : id}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_data(res.data);
                console.log("Printing the store_of_subg : ",post_data);
            }   
        )
    },[])
    const banned_url = "http://localhost:5000/api/get_banned_words";
    console.log(id);
    useEffect (() => {
        axios.post(banned_url,{_id : id}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_ban(res.data);
                console.log("Printing the store_of_subg : ",banned_words);
            }   
        )
    },[])
    if(banned_words.length){
        banned_words = banned_words.split(", ");
    }
    console.log("printing the banned words : ",banned_words);
    let Owner;
    const punctuations = ['.',',','?','!',':',';','\'','"','-',')','(','[',']'];
    console.log("printing the punctuations : ",punctuations);
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log(data,data.get('Tags'));
        // let cur_Date = new Date()
        var nowDate = new Date(); 
        var cur_Date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
        // cur_Date = cur_Date.toString();
        let store = {
            Text : data.get('Text'),
            Subgreddit_id : id,
            Posted_by : profile_data.email,
            Date : cur_Date
        }
        let words = store.Text.split(" ");
        let new_arr = [];
        console.log("printing the words in here : ",words);
        let got_banned=[];
        for(let i=0;i<words.length ; i++){
            let cur_word = words[i];
            let new_word = cur_word;
            let ok = 0;
            let front="",back="";
            console.log(cur_word[0],cur_word[cur_word.length-1],punctuations.includes(cur_word[0]),punctuations.includes(cur_word[cur_word.length-1]));
            if(punctuations.includes(cur_word[0])===true)
            {
                front=cur_word[0];
                console.log("here in back front delete",cur_word,typeof(cur_word));
                cur_word=cur_word.slice(1);
                console.log("here in after front delete",cur_word,typeof(cur_word));
            }
            if(punctuations.includes(cur_word[cur_word.length-1])===true)
            {
                back = cur_word[cur_word.length-1];
                console.log("here in back delete",cur_word,typeof(cur_word));
                cur_word=cur_word.slice(0,-1);
                console.log("here in after delete",cur_word,typeof(cur_word));
            }
            console.log("printing the cur_word here : ",cur_word);
            for(let j=0;j<banned_words.length;j++){
                if(cur_word===banned_words[j]){
                    got_banned.push(banned_words[j]);
                    ok=1;
                }
            }
            if(ok===1)
            {
                new_word="";
                for(let j=0;j<cur_word.length;j++)new_word+="*";
                new_word = front + new_word;
                new_word = new_word + back;
            }
            new_arr.push(new_word);
        }
        console.log("printing the new array : ",new_arr);
        store.Text = new_arr.join(" ");
        got_banned = got_banned.filter(onlyUnique);
        console.log("printing the banned words that we got : ",got_banned);
        if(got_banned.length){
            let got_banned_str=got_banned.join(" ");
            window.alert("Your text contain these banned words "+got_banned_str);
        }
        Owner = profile_data.email  
        // CurSubgreddit =
        console.log("printing the store and it's type : ",store,typeof(store));
        const url = "http://localhost:5000/api/Post";
        axios.post(url,store).then(
            res => {
                console.log("ok so submitted post information")
                console.log(res.data)

                handleClose()
                window.location.reload();
            }
            )
      };
      console.log("printing the subg-data",post_data); 
    //   const renderlists = subgreddit_data.map((item,val) => <div>{val}</div>)
    let [get_subg_data,set_subg_data]=useState();
    const [isLoading,setIsLoading]=useState(false)

    const get_subg = "http://localhost:5000/api/get_subg_data";
    useEffect (() => {
        setIsLoading(true)
        // window.alert("here")
        axios.post(get_subg,{Subgreddit_id : id}).then(
            res => {
                console.log("printing the res.data",res.data);
                // store_of_my_subgreddits = res.data;
                set_subg_data(res.data);
                setIsLoading(false)          
                // console.log("Printing the store_of_subg : ",post_data);
            }   
        )
    },[])
    // window.onscroll = function(ev) {
    //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //         // you're at the bottom of the page, load more content here.
    //     }
    // };
    let renderlists=[];
    for (let ele of post_data){
        // if(get_subg_data!==undefined && get_subg_data.BlockedPeople.includes(ele.Posted_by)===true)
        // {
            // renderlists.push(<Posts Text={ele.Text} Upvotes={ele.Upvotes} Downvotes={ele.Downvotes} Subgreddit_id={ele.Subgreddit_id} Posted_by="Blocked User" _id={ele._id}/>)
        // }
        // else
        // {
            renderlists.push(
                <Posts Text={ele.Text} Upvotes={ele.Upvotes} Downvotes={ele.Downvotes} Subgreddit_id={ele.Subgreddit_id} Posted_by={ele.Posted_by} _id={ele._id}/>
            )
        // }
    }

    const theme = createTheme();
  console.log("here in mysubg");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
console.log('printing the owner : ',Owner,typeof(Owner));
    const [post_info, set_post_info] = useState("")
    return (
        <>
        <NavDash/>
        <div className="homeContainer">
            <Sidebar id={id}/>
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
                            Create New Post : 
                            <br/>
                            <div>
                            {   
                                (get_subg_data===undefined ||  get_subg_data.People.includes(profile_data.email) === true)   &&
                                <Button variant="outlined" color="success" size='small' onClick={handleOpen}>
                                    Create
                                </Button>
                            }
                            {
                                (get_subg_data!==undefined &&  get_subg_data.People.includes(profile_data.email) === false)&& 
                                <Button variant="outlined" size='small' disabled>
                                    Join to post
                                 </Button>   
                            }
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Fill the following details to make your own Post :
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
                                            id="Text"
                                            label="Text"
                                            name="Text"
                                            autoComplete="Text"
                                            multiline
                                            rows={4}
                                            value={post_info}
                                            onChange = {(e)=>set_post_info(e.target.value)}
                                            // floatingLabelText="MultiLine and FloatingLabel"
                                            autoFocus
                                            />
                                        
                                
                                            <Button
                                            type="submit"
                                            // onClick={handleClose}
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={!(post_info.length)}
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
                        {isLoading && <FadeLoader style={{  position: "fixed",
                        marginLeft : "20%"
  }}/>}
                        {renderlists}
                </div>
            </div>
            <Rightbar/>
          </div>
        </>
  )
}

export default MySubgreddit
