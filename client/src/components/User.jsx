import { MusicPlayer } from "./MusicPlayer";
import "../css/user.css";
import { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";
import UserPassword from "./UserPassword";

export function User() {
  const {appData} = useContext(AppContext);
  const [login,setLogin] = useState(false);
  return (
    <UserContext.Provider value={{setLogin}} >
      {login ? (
        <div  className="user_container">
          <div style={{border:`solid 2px ${appData.colors.c1}`,backgroundColor:`${appData.colors.c4}60`}} className="msg_container">
            <div className="m_m">
              <MusicPlayer/>
            </div>
            <h1 style={{color:appData.colors.c3}} className="msg">{appData.msg}</h1>
          </div>
        </div>
      ):(
        <UserPassword/>
      )}
    </UserContext.Provider>
  );
};