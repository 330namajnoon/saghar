import axios from "axios";
import { useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import "../css/app.css";
import Loading from "./Loading";
import { Admin } from "./Admin";
import { User } from "./User";
export default function App() {
    const appURL = "http://localhost:4000";
    const [appData,setAppData] = useState({});
    const [loading,setLoading] = useState(false);
    useEffect(()=> {
        dataDownload();
        
    },[]);
    return(
        <AppContext.Provider value={{appData}} >
        {loading ? (
            <div style={{fontFamily:appData.fonts[appData.fontSelected]}}  className="app_container">
                <h1 style={{color:appData.colors.c2,backgroundColor:appData.colors.c1}}>{appData.appName}</h1>
                {getUrl() === appData.adminPassword ? (
                    
                    <Admin />
                  

                ): (

                    <User/>
                )}
    
            </div>
        ) : (
            <Loading />
        )
        }    
        </AppContext.Provider>
    );

    function getUrl() {
        let url = window.location.pathname.slice(1, window.location.pathname.length);
        return url
    }

    function dataDownload() {
        axios.get(`${appURL}/appData`).then(res => {
            setAppData(res.data);
            setLoading(true);
        })
    }
}