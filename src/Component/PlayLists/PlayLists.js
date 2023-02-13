import React,{ useEffect } from 'react'
import { useStateProvider } from '../../StateProvider';
import axios from 'axios';
export default function PlayLists(){
  const [{ token, dispatch }] = useStateProvider();
  useEffect(() => {
    const getPlayListsData =async () => {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: "Bearer" + token,
          "Content-Type": "application/json",
        },
      });
      const { items } =response.data;
      const PlayLists = item.map(({name,id}) => {
        return { name,id };
      });
      console.log(PlayLists)
    }; 
    getPlayListsData();
  },[token, dispatch]);
  return <div>PlayLists</div>;
}
