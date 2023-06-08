import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed_Profile({ username }) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        <Post/>
      </div>
    </div>
  );
}
