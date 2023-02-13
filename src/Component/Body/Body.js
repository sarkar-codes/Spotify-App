import React from "react";
import "./Body.css";
import Header from "../Header/Header.js" 
import { useDataLayerValue } from "../../DataLayer";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from "../SongRow/SongRow.js";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  const usePlaylist = (id) => {
    spotify.play({
      context_uri: `spotify:playlist:7nJri2tel6UcwPCUJ4StDO`
    }).then((res)=>{
      spotify.getMyCurrentPlayingTrack().then((r)=>{
        dispatch({
          type:"SET_ITEM",
          item:r.item,
        });
        dispatch({
          type:"SET_PLAYING",
          playing:true,
        });
      });
    });
  };
  const playSong = (id) =>{
    spotify.play({
      uris: [`spotify:track:${id}`],
    }).then((res)=>{
      spotify.getMyCurrentPlayingTrack().then((r)=>{
        dispatch({
          type:"SET_ITEM",
          item:r.item,
        });
        dispatch({
          type:"SET_PLAYING",
          playing:true,
        });
      });
    });
  };
  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        <img src={discover_weekly?.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon className="body_shuffle"  onClick={usePlaylist}/>
          <FavoriteBorderIcon fontSize="large"/>
          <MoreHorizIcon/>
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow track={item.track} playSong={playSong}/>
        ))}
      </div>
    </div>
  );
}

export default Body;