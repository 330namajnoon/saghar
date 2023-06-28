import { useContext } from "react";
import "../css/userPassword.css";
import AppContext from "../contexts/AppContext";
import UserContext from "../contexts/UserContext";
function UserPassword() {
    const {appData} = useContext(AppContext);
    const {setLogin} = useContext(UserContext);
    return ( 
        <div style={{backgroundImage:`url(../mediya/${appData.backImage})`}} className="userPassword_container">
            <div style={{backgroundColor:`${appData.colors.c4}60`,border:`solid 2px ${appData.colors.c3}`}} className="password_container">
                <h1 style={{color:`${appData.colors.c3}`}} >{appData.passwordMsg}</h1>
                <input onInput={(event)=> {
                    let value = event.target.value;
                    if(value === appData.userPassword) setLogin(true);
                }} style={{color:`${appData.colors.c3}`,backgroundColor:`${appData.colors.c4}90`,border:`solid 2px ${appData.colors.c3}`}}  type="text" />
            </div>
        </div>
    );
}

export default UserPassword;