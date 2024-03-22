const express = require("express");
const data = require('./MOCK_DATA.json');

const app = express();


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


app.listen(8000, () =>{
    console.log("Server is started")
})