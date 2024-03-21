const express = require("express");

const app = express();

app.get('/' , (req, res) =>{
  return res.send("Hello this is a Home page");
})

app.get('/about' , (req, res) =>{
  return res.send("Hello this is a About page");
})

app.listen(8000, () => console.log("Server is started"));
