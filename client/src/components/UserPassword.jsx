import { useContext } from "react";
import "../css/userPassword.css";
import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";
function UserPassword() {
    const {appData} = useContext(AppContext);
    const {setLogin} = useContext(UserContext);
    return ( 
        <div style={{backgroundImage:`url(../mediya/${appData.backImage})`}} className="userPassword_container">
            <div style={{backgroundColor:`${appData.colors[3]}60`,border:`solid 2px ${appData.colors[2]}`}} className="password_container">
                <h1 style={{color:`${appData.colors[2]}`}} >{appData.passwordMsg}</h1>
                <input onInput={(event)=> {
                    let value = event.target.value;
                    if(value === appData.userPassword) setLogin(true);
                }} style={{color:`${appData.colors[2]}`,backgroundColor:`${appData.colors[3]}90`,border:`solid 2px ${appData.colors[2]}`}}  type="text" />
            </div>
        </div>
    );
}

export default UserPassword;