import React from "react";
import "./Sidebar.css";
import SidebarOption from "../SidebarOption/SidebarOption.js";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from "../../DataLayer";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />

      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <SidebarOption title='Hip Hop' />
      <SidebarOption title='Rock' />
      <SidebarOption title='Sayantani fav' />
      <SidebarOption title='Moods' />
      <SidebarOption title='Seasonal' />
    
      {/* {playlists?.items?.map((playlist) => (
        <SidebarOption title={playlist.name} />
      ))} */}
    </div>
  );
}

export default Sidebar;
