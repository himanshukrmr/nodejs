const express = require("express");
// const data = require("./MOCK_DATA.json");
const fs = require("fs");
const { default: mongoose, mongo } = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error", error));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  return res.json(data);
});

app.get("/users", async (req, res) => {
  const allDBUSers = await User.find({});

  const html = `
        <ul>
        ${allDBUSers
          .map(
            (users) => `<li>${users.firstName} : email = ${users.email}</li>`
          )
          .join("")}
        </ul>
    `;
  return res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.job_title ||
    !body.gender ||
    !body.email
  ) {
    return res.status(400).json("All fields are required");
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Sucess" });
});

// edit the data
app.patch("/api/users/patch/:id", async(req, res) => {
//   const id = Number(req.params.id);
//   const updateData = req.body;
//   const index = data.findIndex((user) => user.id === id);

//   if (index !== -1) {
//     data[index] = { ...data[index], ...updateData };

//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ status: "error", message: "Failed to update data" });
//       }
//       return res.json({
//         status: "success",
//         message: "User updated successfully",
//       });
//     });
//   } else {
//     return res.status(404).json({ status: "error", message: "User not found" });
//   }
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    return res.json({msg: "Success"});

});

app.delete("/api/users/delete/:id", async(req, res) => {
//   const id = Number(req.params.id);
//   console.log("ID:", id);
//   const index = data.findIndex((user) => user.id === id);
//   console.log("Index:", index);

//   if (index !== -1) {
//     data.splice(index, 1);
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ status: "error", message: "Failed to update data" });
//       }
//       console.log("User deleted:", id);
//       return res.json({
//         status: "success",
//         message: "User deleted successfully",
//       });
//     });
//   } else {
//     console.log("User not found:", id);
//     return res.status(404).json({ status: "error", message: "User not found" });
//   }
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg: "Sucess"})
});

app.listen(8000, () => {
  console.log("Server is started");
});
