const express = require('express');
const https = require('https');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'))
app.set("view engine", "ejs");

const port = 3000;

app.get("/", (req, res)=> {
    const URL = "https://shibe.online/api/shibes?count=1";
    https.get(URL, (response)=> {
        response.on("data", (image)=> {
            const shibeImage = JSON.parse(image)
            const shibeURL = shibeImage[0]
            res.render("index", {randomShiba: shibeURL})
        })
    })
})

app.listen(process.env.PORT || port, ()=>{
    console.log("Server is up and running at port 3000");
})