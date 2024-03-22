const express = require("express");
const data = require('./MOCK_DATA.json');
const fs = require("fs");

const app = express();

app.use(express.urlencoded({extended: false}));

app.get("/api/users" ,(req,res) =>{
    return res.json(data);
})

app.get("/users" ,(req,res) =>{
    const html = `
        <ul>
        ${data.map((users) => `<li>${users.first_name}</li>`).join("")}
        </ul>
    `
    return res.send(html)
})

app.get("/api/users/:id", (req,res) =>{
    const id = Number(req.params.id);
    const user = data.find((user) => user.id === id);
    return res.json(user);
})

app.post("/api/users",(req,res) =>{
    const body = req.body;
    // console.log(body);
    data.push({...body, id : data.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(data) , (err,datas) =>{
        return res.json({statusIs : "successs"});
    })
})




app.listen(8000, () =>{
    console.log("Server is started")
})