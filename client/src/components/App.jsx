import axios from "axios";
import { useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import "../css/app.css";
import Loading from "./Loading";
import { Admin } from "./Admin";
import { User } from "./User";
export default function App() {
  const appURL = "http://localhost:4000";
  const [appData, setAppData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dataDownload();
  }, []);
  return (
    <AppContext.Provider value={{ appData,setAppData }}>
      {loading ? (
        <div
          style={{ fontFamily: appData.fonts[appData.fontSelected],backgroundImage:`url(${appData.backImage.length < 200 ?`../mediya/${appData.backImage}`:appData.backImage})`}}
          className="app_container"
        >
          <h1
            style={{
              color: appData.colors.c2,
              backgroundColor: appData.colors.c1,
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
    let url = window.location.pathname.split("/");
    let res;
    switch (value) {
      case "id":
        res = url[1];
        break;
      case "admin":
        res = url[2];
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
}
