import "./sidebar.css";
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
import RedditIcon from '@mui/icons-material/Reddit';
import LockIcon from '@mui/icons-material/Lock';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to="/">
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Home Page</span>
            </li>
          </Link>
        <Link to="/Profile">
            <li className="sidebarListItem">
              <RedditIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </li>
          </Link>
          <Link to="/MySubgreddit">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">My Subreddit Page</span>
            </li>
          </Link>
          <Link to="/Subgreddit">
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Subreddits</span>
            </li>
          </Link>
          
          
          <Link to="/saved_post">
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Saved Posts</span>
            </li>
          </Link>
          <Link to="/Logout">
            <li className="sidebarListItem">
              <LockIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Logout</span>
            </li>
          </Link>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <Topusers />
      </div>
    </div>
  );
}
