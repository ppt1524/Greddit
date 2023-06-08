import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="https://cdn.dribbble.com/users/1040983/screenshots/5630845/media/e95768b82810699dfd54512ff570954a.png?compress=1&resize=400x300&vertical=top" alt="" />
          
          <input
            placeholder={"What's in your mind " + "user" + "?"+" Go to my subgreddits to post :)"}
            className="shareInput"
            // ref={desc}
          />
        </div>
        <hr className="shareHr" />
       
        <form className="shareBottom" >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="orange" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="black" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="red" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
