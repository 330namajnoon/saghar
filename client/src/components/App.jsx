import axios from "axios";
import { useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import "../css/app.css";
import Loading from "./Loading";
import { Admin } from "./Admin";
import { User } from "./User";
export default function App() {
  const appURL = "";
  const [appData, setAppData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dataDownload();
  }, []);
  return (
    <AppContext.Provider value={{ appData,setAppData,updateData ,uploadFile,getUrl}}>
      {loading ? (
        <div
        style={{ fontFamily: appData.fonts[appData.fontSelected],backgroundImage:`url(${appData.backImage.length < 200 ?`../mediya/${appData.backImage}`:appData.backImage})`}}
        className="app_container"
        >
          
          <h1
            style={{
              color: appData.colors[1],
              backgroundColor: appData.colors[0],
            }}
          >
            {appData.appName}
          </h1>
          {getUrl("admin") === appData.adminPassword ? <Admin /> : <User />}
        </div>
      ) : (
        <Loading />
      )}
    </AppContext.Provider>
  );

  function getUrl(value = "id") {
    let url = window.location.search.slice(1,window.location.search.length).split("&");
    let res;
    switch (value) {
      case "id":
        res = url[0];
        break;
      case "admin":
        res = url[1];
        break;
    }
    return res;
  }

  function dataDownload() {
    const formData = new FormData();
    formData.append("id", getUrl());
    axios.post(`${appURL}/appData`, formData).then((res) => {
      setAppData(res.data);
      setLoading(true);
    });
  }
  
  function updateData(fileI,fileM) {
    let newData = {...appData};
    if(fileI) {
      newData.backImage = getUrl("id")+Math.floor(Math.random()*10)+"."+ fileI.name.split(".")[fileI.name.split(".").length - 1];
      uploadFile(fileI,newData.backImage);
    }
    if(fileM) {
      newData.music = getUrl("id")+Math.floor(Math.random()*10)+"."+fileM.name.split(".")[fileM.name.split(".").length - 1];
      uploadFile(fileM,newData.music);
    }
    const formData = new FormData();
    formData.append("id", getUrl());
    formData.append("data",JSON.stringify(newData));
    setLoading(false);
    axios.post(`${appURL}/updateData`, formData).then((res) => {
      setAppData(res.data);
      setLoading(true);
    });

  }
  function uploadFile(file,name) {
    const formData = new FormData();
    formData.append("id", name);
    formData.append("file",file);
    setLoading(false);
    axios.post(`${appURL}/uploadFile`, formData).then((res) => {
      setLoading(true);
    });

  }
}
