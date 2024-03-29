import { useContext, useRef, useState } from "react";
import AppContext from "../contexts/AppContext";
import AdminContext from "../contexts/AdminContext";
import { MusicPlayer } from "./MusicPlayer";
import "../css/admin.css";

export function Admin() {
  const { appData, setAppData,updateData} = useContext(AppContext);
  const [fileM, setFileM] = useState(null);
  const [fileI, setFileI] = useState(null);
  const fileInputM = useRef(null);
  const fileInputI = useRef(null);
  const colorInput = useRef(null);
  const [colorSelect, setColorSelect] = useState(0);
  
  return (
    <AdminContext.Provider value={{}}>
      <div className="admin_container">
        <input
          accept="image/*"
          ref={fileInputI}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            fileReaderI(e.target.files[0]);
          }}
        />
        <input
          style={{
            fontFamily: appData.fonts[appData.fontSelected],
            border: `solid 1px ${appData.colors[1]}`,
            color: `${appData.colors[1]}`,
            backgroundColor: `${appData.colors[0]}`,
          }}
          type="button"
          value="NEW IMAGE"
          onClick={() => {
            fileInputI.current.click();
          }}
        />
        <div
          style={{
            border: `solid 2px ${appData.colors[0]}`,
            backgroundColor: `${appData.colors[3]}60`,
          }}
          className="msg_container"
        >
          <div className="m_m">
            <MusicPlayer />
            <input
              accept="audio/*"
              ref={fileInputM}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                fileReaderM(e.target.files[0]);
              }}
            />
            <input
              style={{
                fontFamily: appData.fonts[appData.fontSelected],
                border: `solid 1px ${appData.colors[1]}`,
                color: `${appData.colors[1]}`,
                backgroundColor: `${appData.colors[0]}`,
              }}
              type="button"
              value="NEW MUSIC"
              onClick={() => {
                fileInputM.current.click();
              }}
            />
          </div>
          <textarea
            style={{
              fontFamily: appData.fonts[appData.fontSelected],
              color: appData.colors[1],
            }}
            className="msg"
            value={appData.msg}
            onInput={(e) => {
              let newData = {...appData};
              newData.msg = e.target.value;
              setAppData(newData);
              
            }}
          ></textarea>
        </div>
        <select
          style={{
            border: `solid 1px ${appData.colors[1]}`,
            color: `${appData.colors[1]}`,
            backgroundColor: `${appData.colors[0]}`,
            fontFamily: appData.fonts[appData.fontSelected],
          }}
          className="fonts"
          onChange={(e) => {
            let newData = { ...appData };
            newData.fontSelected = parseInt(e.target.value);
            setAppData(newData);
          }}
        >
          {appData.fonts.map((f, index) =>
            index === appData.fontSelected ? (
              <option selected style={{ fontFamily: f }} value={index}>
                Font
              </option>
            ) : (
              <option style={{ fontFamily: f }} value={index}>
                Font
              </option>
            )
          )}
        </select>
        <div className="colors">
          <input ref={colorInput} type="color" style={{ display: "none" }} onChange={(e) => {
            let newData = { ...appData };
            newData.colors[colorSelect] = e.target.value;
            setAppData(newData);
          }} />
          {appData.colors.map((c, index) => (
            <div onClick={(e) => {
              setColorSelect(index);
              colorInput.current.click();
            }} style={{ backgroundColor: c }} className="color"></div>
          ))}
        </div>
        <div style={{color:appData.colors[1]}} className="password">
            <input type="text" value={appData.passwordMsg} onChange={(e)=>{
              let newData = {...appData};
              newData.passwordMsg = e.target.value;
              setAppData(newData);
              
            }} style={{
              backgroundColor:appData.colors[3]+"90",
              color:appData.colors[1],
              border:"solid 1px"+appData.colors[0]
            }}/>
            {"=>"}
            <input type="text" value={appData.userPassword} onChange={(e)=>{
              let newData = {...appData};
              newData.userPassword = e.target.value;
              setAppData(newData);
            }} style={{
              backgroundColor:appData.colors[3]+"90",
              color:appData.colors[1],
              border:"solid 1px"+appData.colors[0]
            }}/>
        </div>
        <input type="button" value="SAVE" style={{
          backgroundColor:appData.colors[2],
          color:appData.colors[3],
          padding:"5px",
          width:"35vw",
          fontFamily:appData.fonts[appData.fontSelected],
          fontSize:"4vw",
          marginTop:"20px"
        }} onClick={()=> {
          
          updateData(fileI,fileM);
        }}/>
      </div>
    </AdminContext.Provider>
  );

  function fileReaderM(file) {
    setFileM(file);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      let newData = { ...appData };
      newData.music = fileReader.result;
      setAppData(newData);
    });
    fileReader.readAsDataURL(file);
  }
  function fileReaderI(file) {
    setFileI(file);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      let newData = { ...appData };
      newData.backImage = fileReader.result;
      setAppData(newData);
    });
    fileReader.readAsDataURL(file);
  }
}
