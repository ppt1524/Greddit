import "./sidebar_for_subgreddit.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import Topusers from "../topusers/Topusers";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar({id}) {
  console.log("printing the id here receieved from subg: ",id)
  var [subgreddit_data,set_data] = useState();
    const get_url = "http://localhost:5000/api/Subgreddit_info_for_display";
    
    useEffect (() => {
        axios.post(get_url,{id :{id}}).then(
            res => {
                console.log("printing the res.data",res.data);
                set_data(res.data);
              }   
              )
            },[])
            console.log("Printing the store_of_subg here in sidebar: ",subgreddit_data);
      let temp = [];
      if(subgreddit_data !== undefined)
      temp = subgreddit_data[0];
      console.log("image here : ",temp.Image)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItemText">
          {subgreddit_data!==undefined && <img src={subgreddit_data[0].Image} alt="loading" style={{
            backgroundPosition : "center",
            backgroundSize : "cover",
            width: "100%",
            height: "30vh",
            position: "relative",
            overflow: "hidden"
          }}/>}
          </li>
         
          <li className="sidebarListItem">
          <span className="sidebarListItemText">Description : {temp.Description}</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <Topusers />
      </div>
    </div>
  );
}
