import React, { useEffect } from "react";
import "./Footer.css";
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined';
import { Grid,Slider } from '@mui/material';
import { useDataLayerValue } from '../../DataLayer';

function Footer({spotify}) {
  const[{token,item,playing},dispatch]=useDataLayerValue();
  useEffect(()=>{
    spotify.getMyCurrentPlaybackState().then((r)=>{
      console.log("the value of r is:",r);
    dispatch({
type:"SET_PLAYING",
playing:r.is_playing,
    });
    dispatch({
      type:"SET_ITEM",
      item:r.item,
    });
    });
  },[spotify,token,dispatch]);
  const playOrPause = () =>{
    if(playing){
      spotify.pause();
      dispatch({
        type:"SET_PLAYING",
        playing:false,
      });
    }
    else{
      spotify.play();
      dispatch({
        type:"SET_PLAYING",
        playing:true,
      });
    }
  };
  const PreviousSong = () =>{
    spotify.skipToPrevious();
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
  };
  const NextSong = () =>{
    spotify.skipToNext();
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
  };
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          src="https://i.pinimg.com/originals/8d/c7/52/8dc752834195102e4cb630a53221255e.jpg"
          alt=""

           className="footer__albumLogo"
        /> 
        {item ?(
      <div className="current_song_details">
      <h2>{item.name}</h2>
      <p>{item.artists.map((artist)=>artist.name).join(", ")}</p>
      </div>
    )
      :
      (
        <div className="footer__songInfo">
          <h4>No Song Is Playing</h4>
          <p>loading...</p>
        </div>
      )
}
      </div>
      <div className="footer__center">
        <ShuffleOutlinedIcon className="footer__green"/>
        <SkipPreviousOutlinedIcon className="footer__icon" onClick={PreviousSong}/>{
          playing?
            
  
        <PlayCircleFilledOutlinedIcon fontSize="large" className="footer__icon" onClick={playOrPause} />
        :
        <PauseCircleFilledOutlinedIcon fontSize="large" className="footer__icon"onClick={playOrPause}/>
}
        <SkipNextOutlinedIcon  className="footer__icon" onClick={NextSong}/>
        <RepeatOutlinedIcon className="footer__green"/>
      </div>
      
       <div className="footer__right">
        <Grid container spacing={2}>
          <PlaylistPlayOutlinedIcon className="footer__volume"/>
          <VolumeDownOutlinedIcon className="footer__playlist"/>
          <Slider/>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;