import React from "react";
import "./Player.css";
import Sidebar from "../Sidebar/Sidebar.js";
import Body from '../Body/Body.js'
import Footer from '../Footer/Footer.js';
function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer spotify={spotify}/>
    </div>
  )
  }
 export default Player;