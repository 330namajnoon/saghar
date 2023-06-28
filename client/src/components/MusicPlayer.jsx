import { useContext, useRef, useState } from "react";
import "../css/musicPlayer.css";
import AppContext from "../contexts/AppContext";
export function MusicPlayer() {
  const {appData} = useContext(AppContext);  
  const audio = useRef(null);
  const [played,setPlayed] = useState(false);
  const [time,setTime] = useState(0);
  let timer_;
  return (
    <div style={{backgroundColor:appData.colors.c2}} className="musicPlayer_container">
      <audio ref={audio}  src={appData.music.length < 200 ?`../mediya/${appData.music}`:appData.music}></audio>
      {!played ? (
        <span style={{color:appData.colors.c1}} onClick={()=> {
          setPlayed(true);
          play_pause();
        }} className="material-symbols-rounded" id="play_pause">play_circle</span>
        ):(
          <span style={{color:appData.colors.c1}} onClick={()=> {
            setPlayed(false)
            play_pause();
        }} className="material-symbols-rounded" id="play_pause">pause_circle</span>
      )}
     
    </div>
  );

 

  function play_pause() {
    if(!played) {
      audio.current.play();
    }else {
      audio.current.pause();
    }
  }
};