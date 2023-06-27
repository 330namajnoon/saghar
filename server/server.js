const express = require("express");
const http = require("http");
const path = require("path");
const pdp = path.join(__dirname,"./");
const port = process.env.PORT || 4000;
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.static(pdp));
const server = http.createServer(app);
server.listen(port,()=> {
    console.log(`server is up on port ${port}!`);
})


app.get("/appData",(req,res)=> {
    fs.readFile("./data.json",(err,data)=> {
        if(!err) {
            res.send(JSON.parse(data.toString()));
        }
    })
})