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

// edit the data
app.patch("/api/users/patch/:id", (req, res) => {
    const id = Number(req.params.id);
    const updateData = req.body;
    const index = data.findIndex(user => user.id === id);

    if (index !== -1) {
        data[index] = { ...data[index], ...updateData };

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Failed to update data" });
            }
            return res.json({ status: "success", message: "User updated successfully" });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
});



app.delete("/api/users/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log('ID:', id);
    const index = data.findIndex((user) => user.id === id);
    console.log('Index:', index);

    if (index !== -1) {
        data.splice(index, 1); 
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: "error", message: "Failed to update data" });
            }
            console.log('User deleted:', id);
            return res.json({ status: "success", message: "User deleted successfully" });
        });
    } else {
        console.log('User not found:', id);
        return res.status(404).json({ status: "error", message: "User not found" });
    }
});








app.listen(8000, () =>{
    console.log("Server is started")
})