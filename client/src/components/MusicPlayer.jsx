import { useContext } from "react";
import AppContext from "../contexts/AppContext";
export function MusicPlayer() {
  const {appData} = useContext(AppContext);  
  return (
    <div>
      <audio src={`../mediya/${appData.music}`}></audio>
    </div>
  );
};