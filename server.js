const express = require("express");
const http = require("http");
const path = require("path");
const pdp = path.join(__dirname,"./build");
const port = process.env.PORT || 4001;
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(express.static(pdp));
const server = http.createServer(app);
const fileUploader = multer({storage:multer.diskStorage({
    destination:(req,file,cd)=> {
        cd(null,"./build/mediya");
    },
    filename:(req,file,cd)=> {
        cd(null,file.originalname);
    }
})})
server.listen(port,()=> {
    console.log(`server is up on port ${port}!`);
})

app.get("*",(req,res)=> {
   
})
app.post("/appData",multer().none(),(req,res)=> {
    fs.readFile("./data.json",(err,data)=> {
        if(!err) {
            res.send(JSON.parse(data.toString()).find(u => u.id == req.body.id));
        }
    })
})
app.post("/updateData",multer().none(),(req,res)=> {
    fs.readFile("./data.json",(err,data)=> {
        if(!err) {
            const users = JSON.parse(data.toString());
            let index = users.indexOf(users.find(u => u.id == req.body.id));
            users[index] = JSON.parse(req.body.data);
            console.log(users[index])
            fs.writeFile("./data.json",JSON.stringify(users),(err)=> {
                if(!err) {
                    res.send(users.find(u => u.id == req.body.id));
                }
            })
        }
    })
})

app.post("/uploadFile",fileUploader.single("file"),(req,res)=> {

    fs.renameSync(`../client/public/mediya/${req.file.originalname}`,`../client/public/mediya/${req.body.id}.${req.file.originalname.split(".")[1]}`);
    res.send(true);
})