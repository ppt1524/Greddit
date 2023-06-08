import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./NavDash_without_search.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import RedditIcon from '@mui/icons-material/Reddit';
import Button from '@mui/material/Button';
import { yellow } from '@mui/material/colors';
import Box from '@mui/material/Box';
import RedditIcon from '@mui/icons-material/Reddit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[700]),
  backgroundColor: yellow[700],
  '&:hover': {
    backgroundColor: yellow[900],
  },
}));

const NavDash = ({id}) => {
  console.log("printing the id here in NAV : ",id);
  const [clicked, setClicked] = useState(false);
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
         <NavLink exact to={url} activeClassName="active">
          {/* {title} */}
          {/* {(title=="Log Out" && clicked)  ? localStorage.setItem("ok",false):console.log("here")}  */}
          <BootstrapTooltip title={title}>
          {title=="Home" ? <HomeIcon/> : (title == "Log Out" ? <LogoutIcon/> : <AccountCircleIcon/>)}
        </BootstrapTooltip>
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/Mydashboard" style={{ textDecoration: "none" }}>
          <span className="logo"><RedditIcon /> Greddit</span>
        </Link>
      </div>
      <div className="topbarCenter">
     
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <a href="https://www.youtube.com/watch?v=y7169jEvb-Y">
            <span className="topbarLink">
            ⚡Trending
            </span>
          </a>
          <a href="https://codeforces.com/">
          <span className="topbarLink"
          >❤️Feed
          </span>
          </a>
        </div>
        
        <div className="topbarIcons">

        </div>
        <Link to="/Mydashboard">
            <HomeIcon/>   {/* can put image here */}
        </Link>
        <Link to="/Profile">
            <AccountCircleIcon/>   {/* can put image here */}
        </Link>
        <Link to="/MySubgreddit">
            <AddCommentIcon/>  {/* can put image here */}
        </Link>
        <Link to="/Subgreddit">
            <RedditIcon/>   {/* can put image here */}
        </Link>
        <Link to="/saved_post">
            <SaveAltIcon/>   {/* can put image here */}
        </Link>
        <Link to="/Logout">
        <LogoutIcon/>
        </Link> 
      </div>
    </div>
  );
};

export default NavDash;