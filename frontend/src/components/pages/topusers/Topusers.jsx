import "./Topusers.css";
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box"
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
function Topusers() {
    return (
        <div className="topusersContainer">
            <h4 className="topusersHeading">⭐ Top Users</h4>
                <div className="topusersLinks">
                    @ppt1524  
                        <Button  style={{color:"white"}} variant="contained" size="small" startIcon={<AddCircleOutlineTwoToneIcon/>}>Follow</Button>
                </div>
                <div className="topusersLinks">
                    @yash  
                        <Button  style={{color:"white"}} variant="contained" size="small" startIcon={<AddCircleOutlineTwoToneIcon/>}>Follow</Button>
                </div>
                <div className="topusersLinks">
                    @chirag  
                        <Button style={{color:"white"}} variant="contained" size="small" startIcon={<AddCircleOutlineTwoToneIcon/>}>Follow</Button>
                </div>
                <div className="topusersLinks">
                    @manav  
                        <Button  style={{color:"white"}} variant="contained" size="small" startIcon={<AddCircleOutlineTwoToneIcon/>}>Follow</Button>
                </div>
        </div>
    )
}

export default Topusers