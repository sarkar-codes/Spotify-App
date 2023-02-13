import React, { useEffect } from "react";
import Login from "./Login";
import "./App.css";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Component/Player/Player.js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  //const [token, setToken] = useState(null);
  //const [{}, dispatch] = useDataLayerValue();
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
     // setToken(_token);
      dispatch({
         type: "SET_TOKEN",
         token: _token,
       });
       
       //console.log("[token]", token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
      spotify.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        })
        console.log("response:",response);
      });
      spotify.getMyTopArtists().then((response) =>
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    );
  
    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    });
  
      }
      console.log("token",token);
    },[token,dispatch]);
    console.log("The user is: ",user);
    console.log("token : ",token);
  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
